import axios from 'axios'

export async function addTransaction({ url, data, token }) {
    const res = await axios.post(url, data, {
        headers: {
            'Content-Type': 'raw',
            Authorization: `Bearer ${token}`,
        },
    })
    return res
}
