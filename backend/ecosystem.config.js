module.exports = {
    apps: [
        {
            name: 'kupipodariday-backend',
            script: './dist/src/main.js', // Укажите путь к вашему собранному файлу
            instances: 'max', // Запускать максимальное количество инстансов
            exec_mode: 'cluster', // Режим выполнения
            env: {
                NODE_ENV: 'production',
                PORT: 3000, // Укажите порт, который будет использоваться
            },
        },
    ],
};
