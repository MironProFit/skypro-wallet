import axios from 'axios'

export async function loginUser(login, password, email) {
    const res = await axios.post(
        'https://wedev-api.sky.pro/api/user',
        { login, password, email },
        {
            headers: {
                'Content-Type': 'raw',
            },
        }
    )
    return res
}
