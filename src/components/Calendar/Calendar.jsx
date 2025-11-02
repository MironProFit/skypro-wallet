// import { useRef, useState, useEffect, useMemo } from 'react'
// import { SectionTitle } from '../../styles/GlobalStyled'
// import { CalendarSection, DaysOfWeek, DayName, MonthContainer, MonthHeader, CalendarGrid, DayCell, CalendarWrapper, CalendarTitle, MonthWrapper } from '../../components/Calendar/Calendar.styles'
// import { ExpensesHeaderLink, LinkIcon, LinkWrapper } from '../Expenses/Expenses.styles'
// import { useLocation } from 'react-router-dom'
// import leftArrIcon from '../../assets/image/icon/arrow-left-icon.png'
// import { useAuthContext } from '../../contexts/AuthContext'
// import { useAppContext } from '../../contexts/AppContext'

// // Helper function to get days in a month
// const getDaysInMonth = (month, year) => {
//     return new Date(year, month + 1, 0).getDate()
// }

// // Main Calendar Component
// const CalendarComponent = ({ $isFilter }) => {
//     const { startDate, setStartDate, endDate, setEndDate } = useAppContext()
//     const currentDate = new Date()
//     const [displayedYear, setDisplayedYear] = useState(currentDate.getFullYear())
//     const [displayedMonth, setDisplayedMonth] = useState(currentDate.getMonth())
//     const calendarRef = useRef(null)
//     const [today, setToday] = useState(currentDate)
//     const location = useLocation()

//     const monthsToShow = useMemo(() => {
//         const months = []
//         for (let i = -3; i <= 3; i++) {
//             months.push(new Date(displayedYear, displayedMonth + i))
//         }
//         return months
//     }, [displayedYear, displayedMonth])

//     // Handle date selection
//     // const handleDateClick = (day, month, year) => {
//     //     const selectedDate = new Date(year, month, day)
//     //     if (!startDate || (startDate && endDate)) {
//     //         setStartDate(selectedDate)
//     //         setEndDate(null)
//     //     } else {
//     //         if (selectedDate >= startDate) {
//     //             setEndDate(selectedDate)
//     //         } else {
//     //             setEndDate(startDate)
//     //             setStartDate(selectedDate)
//     //         }
//     //     }
//     // }
//     const handleDateClick = (day, month, year) => {
//         const selectedDate = new Date(year, month, day)

//         if (!startDate || (startDate && endDate)) {
//             // Если ничего не выбрано, или оба выбраны, начинаем новую выборку
//             setStartDate(selectedDate)
//             setEndDate(null)
//         } else if (startDate && !endDate) {
//             // Если есть только startDate, задаем endDate
//             if (selectedDate >= startDate) {
//                 setEndDate(selectedDate)
//             } else {
//                 // Если выбранная дата раньше startDate, меняем местами
//                 setEndDate(startDate)
//                 setStartDate(selectedDate)
//             }
//         }
//     }

//     // Check if a date is in the selected range
//     // const isDateInRange = (day, month, year) => {
//     //     const currentDay = new Date(year, month, day)
//     //     return startDate && endDate ? currentDay >= startDate && currentDay <= endDate : startDate && currentDay.getTime() === startDate.getTime()
//     // }

//     const isSameDay = (date1, date2) => {
//         return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
//     }

//     const isDateInRange = (day, month, year) => {
//         const currentDay = new Date(year, month, day)
//         if (startDate && endDate) {
//             // Проверяем, что currentDay между startDate и endDate (включительно)
//             return currentDay >= startDate && currentDay <= endDate
//         }
//         if (startDate) {
//             // Проверяем, что currentDay равна startDate
//             return isSameDay(currentDay, startDate)
//         }
//         return false
//     }

//     useEffect(() => {
//         const now = new Date()
//         setStartDate(now)
//         setEndDate(now)
//     }, [])

//     // useEffect(() => {
//     //     // if (!startDate || !endDate) {
//     //     const now = new Date()
//     //     setStartDate(now)
//     //     setEndDate(now)
//     //     // }
//     // }, [startDate, endDate, setStartDate, setEndDate])

//     // Scroll to today in the calendar view
//     useEffect(() => {
//         const todayMonth = today.getMonth()
//         const todayYear = today.getFullYear()

//         if (displayedYear === todayYear && displayedMonth === todayMonth) {
//             if (calendarRef.current) {
//                 const todayCell = calendarRef.current.querySelector(`div[data-date='${today.getFullYear()}-${today.getMonth()}-${today.getDate()}']`)
//                 if (todayCell) {
//                     todayCell.scrollIntoView({ behavior: 'smooth', block: 'center' })
//                 }
//             }
//         }
//     }, [displayedYear, displayedMonth, today])

//     const { isMobile } = useAppContext()
//     const [isExpensesPage, setIsExpensesPage] = useState()

//     useEffect(() => {
//         location.pathname === '/expenses' ? setIsExpensesPage(true) : setIsExpensesPage(false)
//     }, [location])

//     return (
//         <CalendarSection $isFilter={$isFilter} $isMobile={isMobile}>
//             {!$isFilter && !isMobile && (
//                 <>
//                     <CalendarTitle>
//                         {isMobile && (
//                             <LinkWrapper to={'/expenses'} style={{ order: 2, display: isMobile ? 'flex' : 'none' }}>
//                                 <LinkIcon src={leftArrIcon} alt="+"></LinkIcon>
//                                 <ExpensesHeaderLink $isExpensesPage={isExpensesPage} $isMobile={isMobile}>
//                                     Мои расходы
//                                 </ExpensesHeaderLink>
//                             </LinkWrapper>
//                         )}
//                     </CalendarTitle>
//                 </>
//             )}
//             {isMobile && !$isFilter ? <SectionTitle $isMobile={isMobile}>Выбор периода</SectionTitle> : !$isFilter ? <SectionTitle $isMobile={isMobile}>Период</SectionTitle> : ''}

//             <DaysOfWeek $isFilter={$isFilter} $isMobile={isMobile}>
//                 {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((day) => (
//                     <DayName key={day}>{day}</DayName>
//                 ))}
//             </DaysOfWeek>

//             <CalendarWrapper $isFilter={$isFilter} ref={calendarRef}>
//                 {monthsToShow.map((date) => {
//                     const month = date.getMonth()
//                     const year = date.getFullYear()
//                     const daysInMonth = getDaysInMonth(month, year)
//                     const firstDay = new Date(year, month, 1).getDay() - 1
//                     const effectiveFirstDay = firstDay < 0 ? 6 : firstDay

//                     return (
//                         <MonthWrapper key={`${month}-${year}`}>
//                             <MonthContainer>
//                                 <MonthHeader>
//                                     {date.toLocaleString('default', { month: 'long' }).charAt(0).toUpperCase() + date.toLocaleString('default', { month: 'long' }).slice(1)} {year}
//                                 </MonthHeader>
//                                 <CalendarGrid $isFilter={$isFilter} $isMobile={isMobile}>
//                                     {Array.from({ length: effectiveFirstDay }).map((_, i) => (
//                                         <div key={i} style={{ width: '40px', height: '40px' }}></div>
//                                     ))}
//                                     {Array.from({ length: daysInMonth }).map((_, day) => {
//                                         const dateNum = day + 1
//                                         const isToday = currentDate.getDate() === dateNum && currentDate.getMonth() === month && currentDate.getFullYear() === year
//                                         const isInRange = isDateInRange(dateNum, month, year)
//                                         const isSelected =
//                                             (startDate && startDate.getDate() === dateNum && startDate.getMonth() === month && startDate.getFullYear() === year) ||
//                                             (endDate && endDate.getDate() === dateNum && endDate.getMonth() === month && endDate.getFullYear() === year)

//                                         return (
//                                             <DayCell
//                                                 $isFilter={$isFilter}
//                                                 $isMobile={isMobile}
//                                                 key={`${year}-${month}-${dateNum}`}
//                                                 data-date={`${year}-${month}-${dateNum}`}
//                                                 $isToday={isToday}
//                                                 // $isInRange={isInRange} // Передаем isInRange
//                                                 $isSelected={isSelected || isInRange}
//                                                 onClick={() => handleDateClick(dateNum, month, year)}
//                                             >
//                                                 {dateNum}
//                                             </DayCell>
//                                         )
//                                     })}
//                                 </CalendarGrid>
//                             </MonthContainer>
//                         </MonthWrapper>
//                     )
//                 })}
//             </CalendarWrapper>
//         </CalendarSection>
//     )
// }

// export default CalendarComponent

import { useRef, useState, useEffect, useMemo } from 'react'
import { SectionTitle } from '../../styles/GlobalStyled'
import { CalendarSection, DaysOfWeek, DayName, MonthContainer, MonthHeader, CalendarGrid, DayCell, CalendarWrapper, CalendarTitle, MonthWrapper } from '../../components/Calendar/Calendar.styles'
import { ExpensesHeaderLink, LinkIcon, LinkWrapper } from '../Expenses/Expenses.styles'
import { useLocation } from 'react-router-dom'
import leftArrIcon from '../../assets/image/icon/arrow-left-icon.png'
import { useAppContext } from '../../contexts/AppContext'

// Helper функция для получения количества дней в месяце
const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate()

const CalendarComponent = ({ $isFilter }) => {
    const { startDate, setStartDate, endDate, setEndDate } = useAppContext()
    const currentDate = new Date()
    const [displayedYear, setDisplayedYear] = useState(currentDate.getFullYear())
    const [displayedMonth, setDisplayedMonth] = useState(currentDate.getMonth())
    const calendarRef = useRef(null)
    const [today, setToday] = useState(currentDate)
    const location = useLocation()

    // Генерация списка месяцев для отображения
    const monthsToShow = useMemo(() => {
        const months = []
        for (let i = -3; i <= 3; i++) {
            months.push(new Date(displayedYear, displayedMonth + i))
        }
        return months
    }, [displayedYear, displayedMonth])

    // Обработчик выбора даты
    const handleDateClick = (day, month, year) => {
        const selectedDate = new Date(year, month, day)

        if (!startDate || (startDate && endDate)) {
            setStartDate(selectedDate)
            setEndDate(null)
        } else if (startDate && !endDate) {
            if (selectedDate >= startDate) {
                setEndDate(selectedDate)
            } else {
                setEndDate(startDate)
                setStartDate(selectedDate)
            }
        }
    }

    // Проверка, является ли две даты одной датой
    const isSameDay = (date1, date2) => {
        return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
    }

    // Проверка, входит ли дата в диапазон
    const isDateInRange = (day, month, year) => {
        const currentDay = new Date(year, month, day)
        if (startDate && endDate) {
            // Проверка, что дата между startDate и endDate (включительно)
            return currentDay >= startDate && currentDay <= endDate
        }
        if (startDate) {
            // Проверка, что дата равна startDate
            return isSameDay(currentDay, startDate)
        }
        return false
    }

    // Инициализация текущей даты
    useEffect(() => {
        const now = new Date()
        setStartDate(now)
        setEndDate(now)
    }, [setStartDate, setEndDate])

    // Скролл к сегодняшнему дню
    useEffect(() => {
        const todayMonth = today.getMonth()
        const todayYear = today.getFullYear()

        if (displayedYear === todayYear && displayedMonth === todayMonth) {
            if (calendarRef.current) {
                const todayCell = calendarRef.current.querySelector(`div[data-date='${today.getFullYear()}-${today.getMonth()}-${today.getDate()}']`)
                if (todayCell) {
                    todayCell.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }
            }
        }
    }, [displayedYear, displayedMonth, today])

    const { isMobile } = useAppContext()
    const [isExpensesPage, setIsExpensesPage] = useState()

    useEffect(() => {
        setIsExpensesPage(location.pathname === '/expenses')
    }, [location])

    return (
        <CalendarSection $isFilter={$isFilter} $isMobile={isMobile}>
            {!$isFilter && !isMobile && (
                <CalendarTitle>
                    {isMobile && (
                        <LinkWrapper to={'/expenses'} style={{ order: 2, display: 'flex' }}>
                            <LinkIcon src={leftArrIcon} alt="+" />
                            <ExpensesHeaderLink $isExpensesPage={isExpensesPage} $isMobile={isMobile}>
                                Мои расходы
                            </ExpensesHeaderLink>
                        </LinkWrapper>
                    )}
                </CalendarTitle>
            )}

            {isMobile && !$isFilter ? <SectionTitle $isMobile={isMobile}>Выбор периода</SectionTitle> : !$isFilter ? <SectionTitle $isMobile={isMobile}>Период</SectionTitle> : null}

            <DaysOfWeek $isFilter={$isFilter} $isMobile={isMobile}>
                {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((day) => (
                    <DayName key={day}>{day}</DayName>
                ))}
            </DaysOfWeek>

            <CalendarWrapper $isFilter={$isFilter} ref={calendarRef}>
                {monthsToShow.map((date) => {
                    const month = date.getMonth()
                    const year = date.getFullYear()
                    const daysInMonth = getDaysInMonth(month, year)
                    const firstDay = new Date(year, month, 1).getDay() - 1
                    const effectiveFirstDay = firstDay < 0 ? 6 : firstDay

                    return (
                        <MonthWrapper key={`${month}-${year}`}>
                            <MonthContainer>
                                <MonthHeader>
                                    {date.toLocaleString('default', { month: 'long' }).charAt(0).toUpperCase() + date.toLocaleString('default', { month: 'long' }).slice(1)} {year}
                                </MonthHeader>
                                <CalendarGrid $isFilter={$isFilter} $isMobile={isMobile}>
                                    {Array.from({ length: effectiveFirstDay }).map((_, i) => (
                                        <div key={i} style={{ width: '40px', height: '40px' }}></div>
                                    ))}
                                    {Array.from({ length: daysInMonth }).map((_, day) => {
                                        const dateNum = day + 1
                                        const isToday = currentDate.getDate() === dateNum && currentDate.getMonth() === month && currentDate.getFullYear() === year
                                        const isInRange = isDateInRange(dateNum, month, year)
                                        const isSelected = (startDate && isSameDay(new Date(year, month, dateNum), startDate)) || (endDate && isSameDay(new Date(year, month, dateNum), endDate))
                                        return (
                                            <DayCell
                                                $isFilter={$isFilter}
                                                $isMobile={isMobile}
                                                key={`${year}-${month}-${dateNum}`}
                                                data-date={`${year}-${month}-${dateNum}`}
                                                $isToday={isToday}
                                                $isSelected={isSelected || isInRange}
                                                onClick={() => handleDateClick(dateNum, month, year)}
                                            >
                                                {dateNum}
                                            </DayCell>
                                        )
                                    })}
                                </CalendarGrid>
                            </MonthContainer>
                        </MonthWrapper>
                    )
                })}
            </CalendarWrapper>
        </CalendarSection>
    )
}

export default CalendarComponent
