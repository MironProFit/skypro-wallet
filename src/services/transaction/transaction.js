import axios from 'axios'

export async function transaction({ url, method = 'get', newToken }) {
    const res = await axios[method](url, {
        headers: {
            'Content-Type': 'raw',
            Authorization: `Bearer ${newToken}`,
        },
    })
    return res
}
