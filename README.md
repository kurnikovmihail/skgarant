# SK-Garant Landing (Vue 3 + Vite + Tailwind)

Лендинг строительной компании ООО «СК-Гарант» с портфолио проектов.

## Локальный запуск

```bash
npm install
npm run dev
```

Отдельно запустить API для админки проектов:

```bash
npm run dev:api
```

После этого доступно:
- `http://localhost:5173/admin/login` — вход администратора
- `http://localhost:5173/admin/projects/new` — создание проекта с загрузкой изображений

## Локальный запуск через Docker (рекомендуется)

1. Подготовить env:

```bash
cp .env.docker.example .env
```

2. Изменить в `.env` как минимум:
- `ADMIN_PASSWORD`
- `SESSION_SECRET`

3. Поднять контейнеры:

```bash
npm run docker:up
```

4. Проверка:
- сайт: `http://localhost:8080`
- админка: `http://localhost:8080/admin/login`
- API health: `http://localhost:8080/api/health`

Данные сохраняются в Docker volumes:
- `skgarant_data` (проекты)
- `skgarant_uploads` (изображения)

Остановка:

```bash
npm run docker:down
```

Логи:

```bash
npm run docker:logs
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

## Продакшен для админки проектов (API + загрузка фото)

Чтобы работали создание проектов и загрузка изображений:

1. Разместить код проекта на сервере в `/opt/skgarant`.
2. Подключить Nginx-конфиг с прокси на API:
   - шаблон: `deploy/nginx.server.conf`
3. Установить systemd unit:
   - шаблон: `deploy/skgarant-api.service`
4. Задать безопасные значения:
   - `ADMIN_PASSWORD`
   - `SESSION_SECRET`

Пример команд:

```bash
sudo cp deploy/skgarant-api.service /etc/systemd/system/skgarant-api.service
sudo systemctl daemon-reload
sudo systemctl enable --now skgarant-api

sudo cp deploy/nginx.server.conf /etc/nginx/sites-available/skgarant
sudo ln -sf /etc/nginx/sites-available/skgarant /etc/nginx/sites-enabled/skgarant
sudo nginx -t && sudo systemctl reload nginx
```
