import { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { CalendarSection } from './Calendar.styles'
import { SectionTitle } from '../../styles/GlobalStyled'
import { accentColor, accentColorRgb, borderColor, primaryColor, secondaryColor, textColor, thumbColor } from '../../styles/Mexins.style'
import { useAppCoontext } from '../../contexts/AppContext'

// Styled-components
const Container = styled.div`
    width: 100%;
    height: 450px;
    overflow-x: hidden;
    overflow-y: auto;
    box-sizing: border-box;
    position: relative;

    &::-webkit-scrollbar {
        background-color: transparent;
        width: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${thumbColor};
        border-radius: 10px;
    }
`

const DaysOfWeek = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${primaryColor};
    padding: 5px 0;
    border-bottom: 2px solid ${borderColor};
    position: sticky;
    top: 0;
    z-index: 1;
`

const DayName = styled.div`
    flex: 1;
    text-align: center;
    font-size: 0.9em;
    color: ${borderColor};
`

const MonthContainer = styled.div`
    padding: 10px;
`

const MonthHeader = styled.h3`
    display: flex;
    text-align: center;
    margin: 10px 0;
    font-size: 1em;
`

const CalendarGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 40px);
    grid-auto-rows: 40px;
    gap: 6px;
`

const DayCell = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: ${({ isSelected, isToday, isInRange }) =>
        isSelected
            ? accentColorRgb
            : isToday && isInRange
            ? 'orange' // Цвет для сегодняшнего дня, если он в диапазоне
            : isToday
            ? thumbColor
            : secondaryColor}; // Цвет для сегодняшнего дня, если он не в диапазоне
    color: ${({ isToday }) => (isToday ? primaryColor : textColor)};
    cursor: pointer;

    &:hover {
        background-color: ${accentColorRgb};
    }
`

// Helper function to get days in a month
const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
}

// Main Calendar Component
const CalendarComponent = () => {
    const { startDate, setStartDate, endDate, setEndDate } = useAppCoontext()
    const currentDate = new Date()
    const [displayedYear, setDisplayedYear] = useState(currentDate.getFullYear())
    const [displayedMonth, setDisplayedMonth] = useState(currentDate.getMonth())
    const calendarRef = useRef(null)
    const [today, setToday] = useState(currentDate) // Устанавливаем текущую дату

    const monthsToShow = []
    for (let i = -3; i <= 3; i++) {
        monthsToShow.push(new Date(displayedYear, displayedMonth + i))
    }

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
        setStartDate(today)
        setEndDate(today)
    }, [today])

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

    return (
        <CalendarSection>
            <SectionTitle>Период</SectionTitle>
            <Container ref={calendarRef}>
                <DaysOfWeek>
                    {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((day) => (
                        <DayName key={day}>{day}</DayName>
                    ))}
                </DaysOfWeek>
                {monthsToShow.map((date) => {
                    const month = date.getMonth()
                    const year = date.getFullYear()
                    const daysInMonth = getDaysInMonth(month, year)
                    const firstDay = new Date(year, month, 1).getDay() - 1
                    const effectiveFirstDay = firstDay < 0 ? 6 : firstDay

                    return (
                        <MonthContainer key={`${month}-${year}`}>
                            <MonthHeader>
                                {date.toLocaleString('default', { month: 'long' }).charAt(0).toUpperCase() + date.toLocaleString('default', { month: 'long' }).slice(1)} {year}
                            </MonthHeader>
                            <CalendarGrid>
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
                                            key={day}
                                            data-date={`${year}-${month}-${dateNum}`}
                                            isToday={isToday}
                                            isInRange={isInRange} // Передаем isInRange
                                            isSelected={isSelected || isInRange}
                                            onClick={() => handleDateClick(dateNum, month, year)}
                                        >
                                            {dateNum}
                                        </DayCell>
                                    )
                                })}
                            </CalendarGrid>
                        </MonthContainer>
                    )
                })}
            </Container>
        </CalendarSection>
    )
}

export default CalendarComponent
