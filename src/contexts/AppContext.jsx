import { createContext, useContext, useEffect, useState } from 'react'
const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [isMobile, setIsMobile] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const DEFAULT_MESSAGE_LOADING = 'данных'
    const [loadingMessage, setLoadingMessage] = useState(DEFAULT_MESSAGE_LOADING)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (windowWidth < 751) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }, [windowWidth])

    return (
        <AppContext.Provider
            value={{
                startDate,
                setStartDate,
                endDate,
                setEndDate,
                isMobile,
                setIsMobile,
                windowWidth,
                setWindowWidth,
                isLoading,
                setIsLoading,
                loadingMessage,
                setLoadingMessage,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}
