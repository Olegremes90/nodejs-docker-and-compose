# Этап 1: Сборка фронтенда на основе node:16-alpine
FROM node:16-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь исходный код фронтенда
COPY . .

# Запускаем сборку проекта
RUN npm run build

# Этап 2: Сервер статического контента на основе nginx:latest
FROM nginx:latest

# Копируем собранный фронтенд из предыдущего этапа
COPY --from=build /app/build /usr/share/nginx/html

# Копируем конфигурационный файл nginx в контейнер
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d

# Открываем порт 80
EXPOSE 80

# Запускаем nginx в переднем плане
CMD ["nginx", "-g", "daemon off;"]
