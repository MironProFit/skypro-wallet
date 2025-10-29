import axios from 'axios'

export async function transaction({ url, method = 'get', newToken }) {
    console.log(newToken)
    console.log({
        'Content-Type': 'raw',
        Authorization: `Bearer ${newToken}`,
    })
    const res = await axios[method](url, {
        headers: {
            'Content-Type': 'raw',
            Authorization: `Bearer ${newToken}`,
        },
    })
    return res
}
