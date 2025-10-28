import { useState, useCallback } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { loginUser } from '../../services/autth/login'
import { registerUser } from '../../services/autth/register'

export function useFetch() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { urlApi, setToastNotification, showToast } = useAuthContext()

    const fetchData = useCallback(async ({ url, data }) => {
        setLoading(true)
        setToastNotification(null)
        try {
            const fullUrl = urlApi + url

            const response =
                url === 'user/login'
                    ? await loginUser({ url: fullUrl, login: data.email, password: data.password })
                    : await registerUser({ url: fullUrl, login: data.email, name: data.name, password: data.password })

            return response.data
        } catch (error) {
            const errMsg = error?.response?.data?.error || error?.response?.data?.message || error?.message || 'Ошибка входа'
            console.error('Ошибка входа:', errMsg)
            showToast(`Ошибка запроса: ${errMsg}`, 'error')
            throw error
        } finally {
            setLoading(false)
        }
    })

    return { fetchData, loading, error }
}
