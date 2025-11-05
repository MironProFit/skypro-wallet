import { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [userName, setUserName] = useState(() => localStorage.getItem('userName') || '')
    const [token, setToken] = useState(() => localStorage.getItem('token') || '')
    const [urlApi, setUrlApi] = useState('https://wedev-api.sky.pro/api/')

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
        return []
    })

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token)
        } else {
            localStorage.removeItem('token')
        }
    }, [token])

    useEffect(() => {
        if (userData) {
            localStorage.setItem('userData', JSON.stringify(userData))
        } else {
            localStorage.removeItem('userData')
        }
    }, [userData])

 

    return (
        <AuthContext.Provider
            value={{
                userName,
                setUserName,

                token,
                setToken,

                userData,
                setUserData,

                urlApi,

               
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
