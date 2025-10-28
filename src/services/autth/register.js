import axios from 'axios'

// Функция для регистрации пользователя
export async function registerUser({ url, login, name, password }) {
    console.log('Запуск registerUser')
    console.log(url, login, name, password)
    const res = await axios.post(
        url,
        { login, name, password },
        {
            headers: {
                'Content-Type': 'raw',
            },
        }
    )
    return res
}
