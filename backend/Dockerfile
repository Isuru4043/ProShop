FROM node:22 AS frontend-build
WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

FROM node:22
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY backend ./backend
COPY --from=frontend-build /frontend/build ./frontend/build

RUN mkdir -p /var/data/uploads

EXPOSE 8000

CMD ["node", "backend/server.js"]
