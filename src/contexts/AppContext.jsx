import { createContext, useContext, useState } from 'react'
const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [isWord, setIsWord] = useState('dfgdfg')
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    return <AppContext.Provider value={{ isWord, setIsWord, startDate, setStartDate, endDate, setEndDate }}>{children}</AppContext.Provider>
}

export const useAppCoontext = () => {
    return useContext(AppContext)
}
