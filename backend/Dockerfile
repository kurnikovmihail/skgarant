FROM node:22-alpine AS production
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY backend ./backend
COPY public/content ./public/content

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3001/api/health >/dev/null || exit 1

CMD ["node", "backend/server.js"]
