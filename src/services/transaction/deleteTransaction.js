import axios from 'axios';

export async function deleteTransaction({ url, token }) {
    const res = await axios.delete(url, {
        headers: {
            'Content-Type': 'raw',
            Authorization: `Bearer ${token}`,
        },
    });
    return res;
}