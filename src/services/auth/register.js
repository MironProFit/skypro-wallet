import axios from 'axios'

export async function registerUser({ url, login, name, password }) {
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
