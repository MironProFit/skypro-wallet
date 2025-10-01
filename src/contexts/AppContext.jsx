import { createContext, useContext, useState } from 'react'
const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [isWord, setIsWord] = useState('dfgdfg')
    return <AppContext.Provider value={(isWord, setIsWord)}>{children}</AppContext.Provider>
}

export const useAppCoontext = () => {
    return useContext(AppContext)
}
