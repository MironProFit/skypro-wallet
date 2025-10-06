import { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(() => localStorage.getItem('isAuth') === 'true')

    useEffect(() => {
        setIsAuth(true)
    }, [])
    return (
        <AuthContext.Provider
            value={{
                isAuth,
                setIsAuth,
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
