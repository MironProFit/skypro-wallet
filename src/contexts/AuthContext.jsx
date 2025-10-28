import { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(() => localStorage.getItem('isAuth') === 'true')

    const [userName, setUserName] = useState(() => localStorage.getItem('userName') || '')
    const [token, setToken] = useState(() => localStorage.getItem('token') || '')

    const [userData, setUserData] = useState(() => {
        const stored = localStorage.getItem('userData')
        return stored ? JSON.parse(stored) : { expenses: [] }
    })

    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        setIsAuth(true)
    }, [])

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

                errorMessage,
                setErrorMessage,
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
