import { useState, useCallback } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { loginUser } from '../../services/autth/login'
import { registerUser } from '../../services/autth/register'
import { transaction } from '../../services/transaction/transaction'

export function useFetch() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { urlApi, setToastNotification, showToast, token } = useAuthContext()

    const fetchData = useCallback(async ({ url, data, method, newToken }) => {
        console.log(url, data, method)
        setLoading(true)
        setToastNotification(null)

        //Авторизация

        if (url === 'user' || url === 'user/login') {
            try {
                const fullUrl = urlApi + url
                console.log({ url: fullUrl, login: data.email, password: data.password })

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
        }

        // Транзакции

        if (url === 'transactions') {
            // return console.log('запуск запроса транзакций')
            try {
                const fullUrl = urlApi + url
                console.log({ url: fullUrl, newToken })

                const response = await transaction({ url: fullUrl, newToken })

                console.log(response.data)
                return response.data
            } catch (error) {
                const errMsg = error?.response?.data?.error || error?.response?.data?.message || error?.message || 'Ошибка входа'
                console.error('Ошибка входа:', errMsg)
                showToast(`Ошибка запроса: ${errMsg}`, 'error')
                throw error
            } finally {
                setLoading(false)
            }
        }
    })

    return { fetchData, loading, error }
}
