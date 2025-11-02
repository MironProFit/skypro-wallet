import { useState, useCallback } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { loginUser } from '../services/autth/login'
import { registerUser } from '../services/autth/register'
import { transaction } from '../services/transaction/transaction'
import { deleteTransaction } from '../services/transaction/deleteTransaction'
import { addTransaction } from '../services/transaction/addTransaction'

export function useFetch() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { urlApi, setToastNotification, showToast } = useAuthContext()

    const fetchData = useCallback(async ({ url, data, method, newToken, token, id }) => {
        setLoading(true)
        setToastNotification(null)

        //Авторизация

        if (url === 'user' || url === 'user/login') {
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
        }

        // Транзакции

        if (url === 'transactions') {
            try {
                const fullUrl = urlApi + url + (id ? `/${id}` : '')
                if (method === 'delete') {
                    const response = await deleteTransaction({ url: fullUrl, method, token: token ? token : newToken, id })
                    return response.data
                }
                if (method === 'patch') {
                    const response = await addTransaction({ url: fullUrl, data, method, token })
                    return response.data
                }
                if (method === 'post') {
                    const response = await addTransaction({ url: fullUrl, data, method, token })
                    return response.data
                } else {
                    const response = await transaction({ url: fullUrl, method, token: token ? token : newToken })
                    return response.data
                }
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
