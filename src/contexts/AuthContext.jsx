import { useContext, useState } from 'react'
import { createContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    // const [isAuth, setIsAuth] = useState(() => localStorage.setItem('isAuth') === 'true')
    const [isAuth, setIsAuth] = useState(true)
    // const [isNum, setIsNum] = useState(2)

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

export const useAuthContext = () => {
    return useContext(AuthContext)
}
