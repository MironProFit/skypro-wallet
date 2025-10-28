import { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(() => localStorage.getItem('isAuth') === 'false')

    const [userName, setUserName] = useState(() => localStorage.getItem('userName') || '')
    const [token, setToken] = useState(() => localStorage.getItem('token') || '')
    const [urlApi, setUrlApi] = useState('https://wedev-api.sky.pro/api/')
    const [toastNotification, setToastNotification] = useState(null)

    const [userData, setUserData] = useState(() => {
        const stored = localStorage.getItem('userData')
        return stored ? JSON.parse(stored) : { expenses: [] }
    })

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token)
        }
    }, [token])

    useEffect(() => {
        setIsAuth(true)
    }, [])

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
                setIsAuth,

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
