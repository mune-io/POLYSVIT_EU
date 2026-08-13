# Terraform — S3 static website (POLYSVIT_EU)

Деплоит собранный лендинг (`npm run build` → `../dist`) как статический сайт
на S3: бакет + static website hosting + публичное чтение объектов.
Без CloudFront/HTTPS/домена — это можно добавить отдельным шагом позже
(см. «Дальше» в конце файла).

Захардкожено под аккаунт:

- **Account**: POLYSVIT_EU — `267965637906`
- **Region**: `eu-central-1` (Frankfurt) — регион явно не был указан, выбран
  как ближайший к Щецину; поменяйте через `-var="aws_region=..."`, если
  нужен другой.

Provider настроен с `allowed_account_ids = ["267965637906"]` — `terraform
apply` откажется выполняться, если активные креды указывают на другой
AWS-аккаунт (например, если случайно остался залогинен другой профиль).

## 1. Учётные данные для аккаунта 267965637906

Нужны AWS-креды именно этого member-аккаунта организации. Варианты:

```bash
# вариант A: именованный профиль (access key/secret или SSO)
aws configure --profile polysvit-eu
# или
aws sso login --profile polysvit-eu

# вариант B: если у вас есть роль в организации, которую можно assume
aws sts assume-role \
  --role-arn arn:aws:iam::267965637906:role/<ВАША_РОЛЬ> \
  --role-session-name terraform-deploy
# и экспортировать AccessKeyId/SecretAccessKey/SessionToken в переменные окружения
```

Проверить, что креды бьют в нужный аккаунт:

```bash
aws sts get-caller-identity --profile polysvit-eu
# "Account" в выводе должен быть 267965637906
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
terraform plan  -var="aws_profile=polysvit-eu" -var="bucket_name=polysvit-eu-landing"
terraform apply -var="aws_profile=polysvit-eu" -var="bucket_name=polysvit-eu-landing"
```

Если `bucket_name` не задать, будет использовано имя
`polysvit-eu-267965637906` (гарантированно уникально, так как включает ID
аккаунта). Имя бакета можно закрепить в `terraform.tfvars` (файл уже в
`.gitignore`, туда же удобно положить `aws_profile`):

```hcl
# terraform/terraform.tfvars
aws_profile = "polysvit-eu"
bucket_name = "polysvit-eu-landing"
```

После `apply` в выводе будет `website_endpoint` — публичный HTTP-адрес
вида `http://polysvit-eu-landing.s3-website.eu-central-1.amazonaws.com`.

## 4. Обновление контента

Terraform отслеживает содержимое каждого файла по хэшу (`filemd5`), так что
после изменений в лендинге достаточно:

```bash
npm run build
terraform apply -var="aws_profile=polysvit-eu" -var="bucket_name=polysvit-eu-landing"
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
