import { useRef, useState, useEffect, useMemo } from 'react'
import { useAppContext } from '../../contexts/AppContext'
import { SectionTitle } from '../../styles/GlobalStyled'
import { CalendarSection, DaysOfWeek, DayName, MonthContainer, MonthHeader, CalendarGrid, DayCell, CalendarWrapper, CalendarTitle, MonthWrapper } from '../../components/Calendar/Calendar.styles'
import { ExpensesHeaderLink, LinkIcon, LinkWrapper } from '../Expenses/Expenses.styles'
import { useLocation } from 'react-router-dom'
import leftArrIcon from '../../assets/image/icon/arrow-left-icon.png'

// Helper function to get days in a month
const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
}

// Main Calendar Component
const CalendarComponent = ({ $isFilter }) => {
    const { startDate, setStartDate, endDate, setEndDate } = useAppContext()
    const currentDate = new Date()
    const [displayedYear, setDisplayedYear] = useState(currentDate.getFullYear())
    const [displayedMonth, setDisplayedMonth] = useState(currentDate.getMonth())
    const calendarRef = useRef(null)
    const [today, setToday] = useState(currentDate)
    const location = useLocation()

    // const monthsToShow = []
    // for (let i = -3; i <= 3; i++) {
    //     monthsToShow.push(new Date(displayedYear, displayedMonth + i))
    // }

    const monthsToShow = useMemo(() => {
        const months = []
        for (let i = -3; i <= 3; i++) {
            months.push(new Date(displayedYear, displayedMonth + i))
        }
        return months
    }, [displayedYear, displayedMonth])

    // Handle date selection
    const handleDateClick = (day, month, year) => {
        const selectedDate = new Date(year, month, day)
        if (!startDate || (startDate && endDate)) {
            setStartDate(selectedDate)
            setEndDate(null)
        } else {
            if (selectedDate >= startDate) {
                setEndDate(selectedDate)
            } else {
                setEndDate(startDate)
                setStartDate(selectedDate)
            }
        }
    }

    // Check if a date is in the selected range
    const isDateInRange = (day, month, year) => {
        const currentDay = new Date(year, month, day)
        return startDate && endDate ? currentDay >= startDate && currentDay <= endDate : startDate && currentDay.getTime() === startDate.getTime()
    }

    // Set the default period to today on initial render
    useEffect(() => {
        const now = new Date()
        setStartDate(now)
        setEndDate(now)
    }, [])

    // Scroll to today in the calendar view
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

    useEffect(() => {
        console.log($isFilter)
    }, [$isFilter])

    const { isMobile } = useAppContext()
    const [isExpensesPage, setIsExpensesPage] = useState()

    useEffect(() => {
        location.pathname === '/expenses' ? setIsExpensesPage(true) : setIsExpensesPage(false)
    }, [location])

    return (
        <CalendarSection $isFilter={$isFilter} $isMobile={isMobile}>
            {!$isFilter && !isMobile && (
                <>
                    <CalendarTitle>
                        {isMobile && (
                            <LinkWrapper to={'/expenses'} style={{ order: 2, display: isMobile ? 'flex' : 'none' }}>
                                <LinkIcon src={leftArrIcon} alt="+"></LinkIcon>
                                <ExpensesHeaderLink $isExpensesPage={isExpensesPage} $isMobile={isMobile}>
                                    Мои расходы
                                </ExpensesHeaderLink>
                            </LinkWrapper>
                        )}
                    </CalendarTitle>
                </>
            )}
            {isMobile && !$isFilter ? <SectionTitle $isMobile={isMobile}>Выбор периода</SectionTitle> : !$isFilter ? <SectionTitle $isMobile={isMobile}>Период</SectionTitle> : ''}

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
                                        const isSelected =
                                            (startDate && startDate.getDate() === dateNum && startDate.getMonth() === month && startDate.getFullYear() === year) ||
                                            (endDate && endDate.getDate() === dateNum && endDate.getMonth() === month && endDate.getFullYear() === year)

                                        return (
                                            <DayCell
                                                $isFilter={$isFilter}
                                                $isMobile={isMobile}
                                                key={`${year}-${month}-${dateNum}`}
                                                data-date={`${year}-${month}-${dateNum}`}
                                                $isToday={isToday}
                                                // $isInRange={isInRange} // Передаем isInRange
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
