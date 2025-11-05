import axios from 'axios'

export async function updateTransaction({ url, method, token }) {
    const res = await axios[method](url, {
        headers: {
            'Content-Type': 'raw',
            Authorization: `Bearer ${token}`,
        },
    })
    return res
}
