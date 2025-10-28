import axios from 'axios'

// Функция для регистрации пользователя
export async function registerUser({ login, name, password }) {
    const res = await axios.post(
        'https://wedev-api.sky.pro/api/user',
        { login, name, password },
        {
            headers: {
                'Content-Type': 'raw',
            },
        }
    )
    return res
}
