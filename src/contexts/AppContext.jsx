import { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './AuthContext'
const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const { userData } = useAuthContext()
    const [isMobile, setIsMobile] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const DEFAULT_MESSAGE_LOADING = 'данных'
    const [loadingMessage, setLoadingMessage] = useState(DEFAULT_MESSAGE_LOADING)
    const [isEditMode, setIsEditMode] = useState(false)

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [activeCategories, setActiveCategories] = useState([])
    const [activeDistaffMoney, setActiveDistaffMoney] = useState([]) // или как у тебя
    const [isFilterUserData, setIsFilterUserData] = useState(false)

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

    // useEffect(() => {
    //     const hasCategoryFilter = Array.isArray(activeCategories) && activeCategories.length > 0
    //     const hasMoneyFilter = activeDistaffMoney[0] !== activeDistaffMoney[1]
    //     const hasDateFilter = startDate !== null && endDate !== null && startDate !== endDate

    //     console.log(hasCategoryFilter, hasMoneyFilter, hasDateFilter)

    //     if (hasCategoryFilter || hasMoneyFilter || hasDateFilter) {
    //         setIsFilterUserData(true)
    //     } else {
    //         setIsFilterUserData(false)
    //     }

    //     // Обновляем фильтрованные данные
    //     setfilterUserData(userData)
    // }, [activeCategories, activeDistaffMoney, startDate, endDate, userData])

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
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}
