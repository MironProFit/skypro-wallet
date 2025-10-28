import { useState, useCallback } from 'react'
import axios from 'axios'

function useFetch() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = useCallback(async ({ url, method = 'GET', data = null, headers = {} }) => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios({ url, method, data, headers })
            return response.data
        } catch (err) {
            setError(err)
            throw err // чтобы можно было обработать дальше
        } finally {
            setLoading(false)
        }
    })

    return { fetchData, loading, error }
}
