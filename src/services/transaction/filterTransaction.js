import axios from 'axios'

export async function filerTransaction({ url, data, method, token, id }) {

    const res = await axios[method](url, data, {
        headers: {
            'Content-Type': 'raw',
            Authorization: `Bearer ${token}`,
        },
    })
    return res
}
