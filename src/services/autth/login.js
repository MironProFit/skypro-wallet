import axios from 'axios'

export async function loginUser({ login, password }) {

    const res = await axios.post(
        'https://wedev-api.sky.pro/api/user/login',
        { login, password },
        {
            headers: {
                'Content-Type': 'raw',
            },
        }
    )
    return res
}
