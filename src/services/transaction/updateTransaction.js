import axios from 'axios'

export async function updateTransaction({ url, data, token }) {
    const res = await axios.patch(url, data, {
        headers: {
            'Content-Type': 'raw',
            Authorization: `Bearer ${token}`,
        },
    })
    return res
}
