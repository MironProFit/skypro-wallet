import axios from 'axios';

export async function transaction({ url, token }) {
    const res = await axios.get(url, {
        headers: {
            'Content-Type': 'raw',
            Authorization: `Bearer ${token}`,
        },
    });
    return res;
}