import axios from 'axios'

    export async function deleteTransaction({ url, method = 'delete', token, id }) {
        const res = await axios[method](url, {
            headers: {
                'Content-Type': 'raw',
                Authorization: `Bearer ${token}`,
            },
        })
        return res
    }
