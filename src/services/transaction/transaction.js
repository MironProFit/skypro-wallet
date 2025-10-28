import axios from 'axios'

export async function transaction({ url, method = 'get', token }) {
    console.log(token)
    console.log({
        'Content-Type': 'raw',
        Authorization: `Bearer ${token}`,
    })
    const res = await axios[method](url, {
        headers: {
            'Content-Type': 'raw',
            Authorization: `Bearer ${token}`,
        },
    })
    return res
}
