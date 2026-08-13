# Terraform — S3 static website (PIKA_NOWA)

Деплоит собранный лендинг (`npm run build` → `../dist`) как статический сайт
на S3: бакет + static website hosting + публичное чтение объектов.
Без CloudFront/HTTPS/домена — это можно добавить отдельным шагом позже
(см. «Дальше» в конце файла).

Захардкожено под аккаунт:

- **Account**: PIKA_NOWA — `780770254140` (был сменён с POLYSVIT_EU /
  `267965637906` — см. историю изменений в variables.tf/provider.tf, если
  понадобится переключить обратно)
- **Region**: `eu-central-1` (Frankfurt) — регион явно не был указан, выбран
  как ближайший к Щецину; поменяйте через `-var="aws_region=..."`, если
  нужен другой.

Provider настроен с `allowed_account_ids = ["780770254140"]` — `terraform
apply` откажется выполняться, если активные креды указывают на другой
AWS-аккаунт (например, если случайно остался залогинен другой профиль).

## 1. Учётные данные для аккаунта 780770254140

В этот аккаунт заходят через роль `OrganizationAccountAccessRole` из
management-аккаунта организации (это видно по «Currently active as
OrganizationAccountAccessRole» в консоли). Соответственно, креды нужно
получать через assume-role из учётки, у которой есть права на организацию:

```bash
# вариант A: assume-role напрямую
aws sts assume-role \
  --role-arn arn:aws:iam::780770254140:role/OrganizationAccountAccessRole \
  --role-session-name terraform-deploy \
  --profile <ваш-management-профиль>
# экспортировать AccessKeyId/SecretAccessKey/SessionToken из ответа в переменные окружения
# (AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY / AWS_SESSION_TOKEN)

# вариант B: описать это как профиль в ~/.aws/config, чтобы aws cli делал assume сам
# [profile pika-nowa]
# role_arn = arn:aws:iam::780770254140:role/OrganizationAccountAccessRole
# source_profile = <ваш-management-профиль>
# region = eu-central-1
aws configure --profile <ваш-management-профиль>   # если ещё не настроен базовый профиль
aws sts get-caller-identity --profile pika-nowa
```

Проверить, что креды бьют в нужный аккаунт:

```bash
aws sts get-caller-identity --profile pika-nowa
# "Account" в выводе должен быть 780770254140
```

## 2. Собрать сайт

```bash
cd /media/clearcomp/E/POLYSVIT
npm install
npm run build   # создаёт ../dist, который terraform загрузит в S3
```

## 3. Развернуть

```bash
cd terraform
terraform init
terraform plan  -var="aws_profile=pika-nowa" -var="bucket_name=polysvit-eu-landing"
terraform apply -var="aws_profile=pika-nowa" -var="bucket_name=polysvit-eu-landing"
```

Если `bucket_name` не задать, будет использовано имя
`polysvit-eu-780770254140` (гарантированно уникально, так как включает ID
аккаунта). Имя бакета можно закрепить в `terraform.tfvars` (файл уже в
`.gitignore`, туда же удобно положить `aws_profile`):

```hcl
# terraform/terraform.tfvars
aws_profile = "pika-nowa"
bucket_name = "polysvit-eu-landing"
```

После `apply` в выводе будет `website_endpoint` — публичный HTTP-адрес
вида `http://polysvit-eu-landing.s3-website.eu-central-1.amazonaws.com`.

## 4. Обновление контента

Terraform отслеживает содержимое каждого файла по хэшу (`filemd5`), так что
после изменений в лендинге достаточно:

```bash
npm run build
terraform apply -var="aws_profile=pika-nowa" -var="bucket_name=polysvit-eu-landing"
```

— перезальются только изменившиеся файлы.

## Дальше (не входит в этот стек)

- **HTTPS + собственный домен polysvit.eu**: добавить CloudFront
  (origin = S3 website endpoint), сертификат ACM в `us-east-1` и alias-запись
  в Route 53 (или CNAME у вашего текущего DNS-регистратора, если домен не в
  Route 53).
- **Инвалидация кэша CloudFront** при деплое, если добавите CloudFront.
- **Удалённый state** (S3 backend + DynamoDB lock) — заготовка закомментирована
  в [versions.tf](versions.tf), если будете деплоить не только с одной машины.
