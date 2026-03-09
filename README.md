# SK-Garant Landing (Vue 3 + Vite + Tailwind)

Лендинг строительной компании ООО «СК-Гарант» с портфолио проектов.

## Локальный запуск

```bash
npm install
npm run dev
```

## Продакшен-сборка

```bash
npm run build
```

Готовая статика будет в папке `dist/`.

## Деплой на сервер через Docker

В проекте уже подготовлены:
- `Dockerfile` (многоступенчатая сборка)
- `deploy/nginx.conf` (SPA fallback для маршрутов типа `/projects/:slug`)

Сборка и запуск:

```bash
docker build -t skgarant-landing .
docker run -d --name skgarant -p 8080:80 --restart unless-stopped skgarant-landing
```

После запуска сайт доступен на `http://<server-ip>:8080`.

## SSH ключ и быстрый деплой

Сгенерированный deploy-ключ:
- приватный: `~/.ssh/id_ed25519_skgarant_deploy`
- публичный: `~/.ssh/id_ed25519_skgarant_deploy.pub`

Добавьте публичный ключ в `~/.ssh/authorized_keys` на сервере (для пользователя деплоя).

Для деплоя по SSH (без Docker на сервере) используйте скрипт:

```bash
DEPLOY_HOST=203.0.113.10 \
DEPLOY_USER=root \
DEPLOY_PATH=/var/www/skgarant \
./scripts/deploy.sh
```

Скрипт:
1. Собирает проект (`npm run build`)
2. Загружает `dist/` на сервер через `rsync`
3. Перезагружает `nginx`

## Деплой без Docker (Nginx)

1. Выполнить `npm run build`.
2. Скопировать содержимое `dist/` в директорию сайта на сервере (например, `/var/www/skgarant`).
3. Использовать `try_files $uri $uri/ /index.html;` в `location /`, чтобы работали прямые переходы на страницы проектов.
