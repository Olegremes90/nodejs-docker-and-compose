# Этап 1: Сборка проекта
FROM node:16-alpine AS builder

# Установка рабочей директории
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Установка зависимостей
RUN npm ci

# Копируем исходный код проекта
COPY . .

# Сборка проекта (если необходимо)
RUN npm run build

# Этап 2: Запуск приложения
FROM node:16-alpine

# Установка рабочей директории
WORKDIR /app

# Установка pm2 глобально
RUN npm install -g pm2

# Копируем только необходимые файлы из этапа сборки
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Установка только продакшн-зависимостей
RUN npm install --only=production

# Копируем файл конфигурации PM2
COPY ecosystem.config.js ./

# Открываем порт, который будет использоваться приложением
EXPOSE 3000
# Запуск приложения с помощью pm2
CMD ["pm2-runtime", "ecosystem.config.js"]
