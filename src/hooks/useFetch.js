import { useState, useCallback } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { loginUser } from '../services/autth/login'
import { registerUser } from '../services/autth/register'
import { transaction } from '../services/transaction/transaction'
import { deleteTransaction } from '../services/transaction/deleteTransaction'
import { addTransaction } from '../services/transaction/addTransaction'
import { updateTransaction } from '../services/transaction/updateTransaction'
import { useAppContext } from '../contexts/AppContext'

export function useFetch() {
    const [error, setError] = useState(null)
    const { urlApi } = useAuthContext()
    const { isLoading, setIsLoading, setToastNotification, showToast } = useAppContext()

    const fetchData = useCallback(async ({ url, urlParams, data, method, newToken, token, id }) => {
        setIsLoading(true)
        setToastNotification(null)
        console.log({ url, data, method, newToken, token, id })

        //Авторизация
        setIsLoading(true)

        if (url === 'user' || url === 'user/login') {
            setIsLoading(true)

            try {
                const fullUrl = urlApi + url

                const response =
                    url === 'user/login'
                        ? await loginUser({ url: fullUrl, login: data.email, password: data.password })
                        : await registerUser({ url: fullUrl, login: data.email, name: data.name, password: data.password })

                await showToast(`${url === 'user' ? 'Регистрация успешна' : 'Авторизация успешна'}`, 'success')
                return response.data
            } catch (error) {
                const errMsg = error?.response?.data?.error || error?.response?.data?.message || error?.message || 'Ошибка входа'
                console.error('Ошибка входа:', errMsg)
                showToast(`Ошибка запроса: ${errMsg}`, 'error')

                throw error
            } finally {
                setIsLoading(false)
            }
        }

        // Транзакции

        if (url === 'transactions') {
            setIsLoading(true)

            try {
                const fullUrl = urlApi + url + (id ? `/${id}` : '')

                if (method === 'delete') {
                    const response = await deleteTransaction({ url: fullUrl, method, token: token ? token : newToken, id })
                    await showToast('Успешное удаление транзакции', 'success')

                    return response.data
                }
                if (method === 'patch') {
                    const response = await updateTransaction({ url: fullUrl, data, method, token })
                    await showToast('Успешное обновление транзакции', 'success')
                    return response.data
                }
                if (method === 'post') {
                    const response = await addTransaction({ url: fullUrl, data, method, token })
                    await showToast('Успешное добавление транзакции', 'success')
                    return response.data
                } else {
                    const response = await transaction({ url: fullUrl, method, token: token ? token : newToken })
                    await showToast('Успешное получение списка транзакций', 'warning')
                    return response.data
                }
            } catch (error) {
                const errMsg = error?.response?.data?.error || error?.response?.data?.message || error?.message || 'Ошибка входа'
                console.error('Ошибка входа:', errMsg)

                showToast(`Ошибка запроса: ${errMsg}`, 'error')
                throw error
            } finally {
                setIsLoading(false)
            }
        }
    })

    return { fetchData, error }
}
