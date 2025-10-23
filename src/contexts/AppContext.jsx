import { createContext, useContext, useEffect, useState } from 'react'
const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [isMobile, setIsMobile] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        if (windowWidth < 751) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }, [windowWidth])

    return <AppContext.Provider value={{ startDate, setStartDate, endDate, setEndDate, isMobile, setIsMobile, windowWidth, setWindowWidth }}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}
