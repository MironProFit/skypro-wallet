import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const DEFAULT_MESSAGE_LOADING = 'Загрузка данных'
    const [loadingMessage, setLoadingMessage] = useState(DEFAULT_MESSAGE_LOADING)
    const [isEditMode, setIsEditMode] = useState(false)

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [activeCategories, setActiveCategories] = useState([])
    const [activeDistaffMoney, setActiveDistaffMoney] = useState([])
    const [isFilterUserData, setIsFilterUserData] = useState(false)
    const [toastNotification, setToastNotification] = useState(null)

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
                toast.info(message || 'Что-то пошло не так')
                break
            default:
                toast(message)
        }
    }

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
    useEffect(() => {
        if (startDate && endDate && startDate.getTime() === endDate.getTime()) {
            setStartDate(null)
            setEndDate(null)
        }
    }, [startDate, endDate])

    return (
        <AppContext.Provider
            value={{
                isMobile,
                setIsMobile,

                windowWidth,
                setWindowWidth,

                isLoading,
                setIsLoading,

                loadingMessage,
                setLoadingMessage,

                startDate,
                setStartDate,

                endDate,
                setEndDate,

                activeCategories,
                setActiveCategories,

                activeDistaffMoney,
                setActiveDistaffMoney,

                isFilterUserData,
                setIsFilterUserData,

                isEditMode,
                setIsEditMode,

                toastNotification,
                setToastNotification,
                showToast,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}
