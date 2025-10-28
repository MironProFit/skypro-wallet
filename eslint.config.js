import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{js,jsx}'], // Указываем файлы для проверки
        extends: [
            js.configs.recommended, // Рекомендуемые правила ESLint
            reactHooks.configs['recommended-latest'], // Рекомендуемые правила для хуков React
            reactRefresh.configs.vite // Конфигурация для React Refresh (если вы используете Vite)
        ],
        languageOptions: {
            ecmaVersion: 2020, // Используем новую версию ECMAScript
            globals: globals.browser, // Глобальные переменные для браузера
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true }, // Включаем поддержку JSX
                sourceType: 'module', // Используем модули ES
            },
        },
        rules: {
            'no-unused-vars': 'warn', // Предупреждение о неиспользуемых переменных
            'react/prop-types': 'off', // Отключаем проверку PropTypes (если используете TypeScript или другие подходы)
            'react/jsx-key': 'warn', // Предупреждение о ключах в списках
        },
    },
])