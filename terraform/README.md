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

Всё лежит в одном именованном профиле `PIKA_NOWA` (`~/.aws/config` +
`~/.aws/credentials`) — заполните его своими ключами:

```bash
aws configure --profile PIKA_NOWA
# Access Key ID / Secret Access Key — из IAM консоли аккаунта 780770254140
# Default region: eu-central-1
# Default output format: json
```

Проверить, что креды бьют в нужный аккаунт, удобно скриптом
[check-account.sh](check-account.sh) — см. ниже, либо вручную:

```bash
aws sts get-caller-identity --profile PIKA_NOWA
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
terraform plan  -var="aws_profile=PIKA_NOWA" -var="bucket_name=polysvit-eu-landing"
terraform apply -var="aws_profile=PIKA_NOWA" -var="bucket_name=polysvit-eu-landing"
```

Если `bucket_name` не задать, будет использовано имя
`polysvit-eu-780770254140` (гарантированно уникально, так как включает ID
аккаунта). Имя бакета можно закрепить в `terraform.tfvars` (файл уже в
`.gitignore`, туда же удобно положить `aws_profile`):

```hcl
# terraform/terraform.tfvars
aws_profile = "PIKA_NOWA"
bucket_name = "polysvit-eu-landing"
```

После `apply` в выводе будет `website_endpoint` — публичный HTTP-адрес
вида `http://polysvit-eu-landing.s3-website.eu-central-1.amazonaws.com`.

## 4. Обновление контента

Terraform отслеживает содержимое каждого файла по хэшу (`filemd5`), так что
после изменений в лендинге достаточно:

```bash
npm run build
terraform apply -var="aws_profile=PIKA_NOWA" -var="bucket_name=polysvit-eu-landing"
```

— перезальются только изменившиеся файлы.

## Форма обратной связи

Раздел «Kontakt» на лендинге шлёт `POST` на публичный **API Gateway (HTTP
API) → Lambda** ([mail.tf](mail.tf), код — [lambda/contact-form.mjs](lambda/contact-form.mjs)),
который дописывает каждое сообщение в `mail.txt` в **отдельном приватном
бакете** `<bucket_name>-mail` (не в бакете сайта — иначе файл с чужими email
был бы публично скачиваем).

Изначально стояла более простая связка — публичный **Lambda Function URL**
(`authorization_type = "NONE"`). Технически всё было настроено верно
(resource policy проверена через `aws lambda get-policy`), но этот
AWS-аккаунт стабильно возвращал `403 Forbidden` на анонимные вызовы Function
URL — похоже на организационный guardrail именно против публичных Function
URL (у используемого IAM-пользователя нет `organizations:ListPolicies`,
чтобы подтвердить). Публичные S3-бакеты в этом же аккаунте при этом работают
без проблем. Переключение на API Gateway решило проблему: вызывающая
Lambda сторона — сервис-принципал `apigateway.amazonaws.com`, а не
анонимный интернет, и под этот guardrail не попадает.

Фронтенд узнаёт актуальный URL эндпоинта из `config.json`, который Terraform
сам кладёт в бакет сайта после создания API Gateway (`aws_s3_object.runtime_config`
в mail.tf) — пересобирать фронтенд при каждом `terraform apply` не нужно.

Прочитать накопленные сообщения:

```bash
aws s3 cp s3://polysvit-eu-780770254140-mail/mail.txt - --profile PIKA_NOWA
```

**Важно про эту форму:**
- Эндпоинт публичный и без авторизации/CAPTCHA/rate-limit — сделано
  намеренно просто («тупо сохраняет»). Есть только базовая валидация
  (обязательные поля, формат email, ограничение длины). Если начнётся спам —
  добавить honeypot-поле или hCaptcha/reCAPTCHA на фронте плюс проверку в
  Lambda.
- `mail.txt` обновляется по схеме read-modify-write, так что при двух
  одновременных отправках теоретически возможна гонка — на этот случай на
  бакете включён S3 versioning (`aws_s3_bucket_versioning.mail`), ничего не
  теряется безвозвратно (`aws s3api list-object-versions`).
- Это не email-рассылка — сообщения только копятся в S3, письма на почту не
  уходят. При желании можно навесить на Lambda `ses:SendEmail`, скажите — добавлю.

## Дальше (не входит в этот стек)

- **HTTPS + собственный домен polysvit.eu**: добавить CloudFront
  (origin = S3 website endpoint), сертификат ACM в `us-east-1` и alias-запись
  в Route 53 (или CNAME у вашего текущего DNS-регистратора, если домен не в
  Route 53).
- **Инвалидация кэша CloudFront** при деплое, если добавите CloudFront.
- **Удалённый state** (S3 backend + DynamoDB lock) — заготовка закомментирована
  в [versions.tf](versions.tf), если будете деплоить не только с одной машины.
