// hooks/useFetch.js
import { useState, useCallback } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { useAppContext } from '../contexts/AppContext'

import { loginUser } from '../services/auth/login'
import { registerUser } from '../services/auth/register'
import { transaction } from '../services/transaction/transaction'
import { deleteTransaction } from '../services/transaction/deleteTransaction'
import { addTransaction } from '../services/transaction/addTransaction'
import { updateTransaction } from '../services/transaction/updateTransaction'

export function useFetch() {
    const [error, setError] = useState(null)
    const { urlApi, setToken } = useAuthContext()
    const { setIsLoading, setToastNotification, showToast } = useAppContext()

    const fetchData = useCallback(
        async ({ url, urlParams = '', data, method = 'get', token: customToken, id }) => {
            setIsLoading(true)
            setToastNotification(null)
            console.log({ url, urlParams, data, method, token: customToken, id })

            try {
                // === AUTHENTICATION ===
                if (url === 'user' || url === 'user/login') {
                    const fullUrl = urlApi + url

                    const response =
                        url === 'user/login'
                            ? await loginUser({ url: fullUrl, login: data.email, password: data.password })
                            : await registerUser({ url: fullUrl, login: data.email, name: data.name, password: data.password })

                    await showToast(`${url === 'user/login' ? 'Авторизация' : 'Регистрация'} успешна`, 'success')

                    const newToken = response.data.user?.token
                    if (newToken) {
                        setToken(newToken)

                        const transactionsResponse = await transaction({ url: `${urlApi}transactions`, token: newToken })

                        return { auth: response.data, transactions: transactionsResponse.data }
                    }

                    return response.data
                }

                // === TRANSACTIONS ===
                // ✅ Обработка POST /transactions/period
                if (url === 'transactions/period' && method === 'post') {
                    const fullUrl = urlApi + url
                    const authToken = customToken

                    const response = await transaction({ url: fullUrl, method, data, token: authToken })
                    await showToast('Успешное получение транзакций за период', 'success')
                    return response.data
                }

                // Обычные транзакции
                const fullUrl = urlApi + url + (id ? `/${id}` : '') + urlParams
                const authToken = customToken

                if (method === 'delete') {
                    const response = await deleteTransaction({ url: fullUrl, method, token: authToken, id })
                    await showToast('Успешное удаление транзакции', 'success')
                    return response.data
                }
                if (method === 'patch') {
                    const response = await updateTransaction({ url: fullUrl, data, method, token: authToken })
                    await showToast('Успешное обновление транзакции', 'success')
                    return response.data
                }
                if (method === 'post') {
                    const response = await addTransaction({ url: fullUrl, data, method, token: authToken })
                    await showToast('Успешное добавление транзакции', 'success')
                    return response.data
                }

                // GET
                const response = await transaction({ url: fullUrl, method, token: authToken })
                await showToast('Успешное получение списка транзакций', 'success')
                return response.data
            } catch (error) {
                const errMsg = error?.response?.data?.error || error?.response?.data?.message || error?.message || 'Ошибка'
                console.error('Ошибка запроса:', errMsg)
                showToast(`Ошибка запроса: ${errMsg}`, 'error')
                throw error
            } finally {
                setIsLoading(false)
            }
        },
        [urlApi, setToken, setIsLoading, setToastNotification, showToast]
    )

    return { fetchData, error }
}
