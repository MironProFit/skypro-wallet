import { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [userName, setUserName] = useState(() => localStorage.getItem('userName') || '')
    const [token, setToken] = useState(() => localStorage.getItem('token') || '')
    const [urlApi, setUrlApi] = useState('https://wedev-api.sky.pro/api/')
    const [toastNotification, setToastNotification] = useState(null)

    const [userData, setUserData] = useState(() => {
        const stored = localStorage.getItem('userData')
        if (stored) {
            try {

                return JSON.parse(stored)
            } catch (e) {
                console.error('Ошибка парсинга userData:', e)
                return []
            }
        }
        return [] // Изначально массив
    })

    const isAuth = Boolean(token)

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token)
        }
    }, [token])
    useEffect(() => {
        if (isAuth) {
            localStorage.setItem('isAuth', isAuth)
        } else {
            localStorage.removeItem('token')
        }
    }, [isAuth])

    useEffect(() => {
        if (userData) {
            localStorage.setItem('userData', JSON.stringify(userData))
        } else {
            localStorage.removeItem('userData')
        }
    }, [userData])

    const showToast = (message, type = 'info') => {
        switch (type) {
            case 'success':
                toast.success(message)
                break
            case 'error':
                toast.error(message)
                break
            case 'warning':
                toast.warn(message)
                break
            case 'info':
                toast.info('Что-то пошло не так')
                break

            default:
                toast(message)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                isAuth,

                userName,
                setUserName,

                token,
                setToken,

                userData,
                setUserData,

                urlApi,

                toastNotification,
                setToastNotification,
                showToast,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider

export const useAuthContext = () => {
    return useContext(AuthContext)
}
