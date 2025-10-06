import { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { CalendarSection } from './Calendar.styles'
import { SectionTitle } from '../../styles/GlobalStyled'
import { accentColor, accentColorRgb, borderColor, primaryColor, secondaryColor, successColor, textColor, thumbColor } from '../../styles/Mexins.style'

const Container = styled.div`
    /* max-width: 380px; Максимальная ширина календаря */
    width: 100%; /* Ширина на экранах меньше 380px */
    height: 450px;
    overflow-x: hidden; /* Прокрутка по вертикали */
    overflow-y: auto; /* Прокрутка по вертикали */

    box-sizing: border-box;
    /* border: 1px solid #cccccc; */
    /* border-radius: 8px; */
    /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); */
    position: relative; /* Позволяет фиксировать элементы внутри */

    &::-webkit-scrollbar {
        /* margin-left: 15px; */
        background-color: transparent;
        width: 10px;
    }
    &::-webkit-scrollbar-track {
        /* color: green; */
        /* background-color: green; */
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${thumbColor};
        border-radius: 10px;
    }
`
// const ScrollContainer = styled.div`
//     height: 100%; /* Заполняем весь контейнер */
//     overflow-y: auto; /* Добавляем вертикальную полосу прокрутки */
//     padding-right: 10px; /* Паддинг для отступа от полосы прокрутки */
//     box-sizing: content-box; /* Учитываем ширину прокрутки */

//     &::-webkit-scrollbar {
//         background-color: red;
//         width: 12px;
//     }
// `

const DaysOfWeek = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${primaryColor};
    padding: 5px 0;
    border-bottom: 2px solid ${borderColor}; /* Линия под заголовком дней недели */
    position: sticky; /* Фиксируем позицию */
    top: 0; /* Фиксируем в верхней части контейнера */
    z-index: 1; /* Обеспечиваем отображение поверх содержимого */
`

const DayName = styled.div`
    flex: 1;
    text-align: center;
    font-size: 0.9em; /* Адаптивный размер шрифта */
    color: ${borderColor};
`

const MonthContainer = styled.div`
    padding: 10px;
`

const MonthHeader = styled.h3`
    display: flex;

    text-align: center;
    margin: 10px 0;
    font-size: 1em; /* Адаптивный размер шрифта */
`

const CalendarGrid = styled.div`
    display: grid; /* Используем grid для более предсказуемого размещения */
    grid-template-columns: repeat(7, 40px); /* Сетка с 7 колонками шириной 40px */
    grid-auto-rows: 40px; /* Высота каждой строки - 40px */
    gap: 6px; /* Промежутки между ячейками */
`

const DayCell = styled.div`
    width: 40px; /* Фиксированная ширина ячейки */
    height: 40px; /* Фиксированная высота ячейки */
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%; /* Делаем ячейку круглой */
    background-color: ${({ isSelected, isToday }) => (isSelected ? accentColorRgb : isToday ? thumbColor : secondaryColor)};
    color: ${({ isSelected, isToday }) => (isSelected || isToday ? accentColor : textColor)};
    cursor: pointer;

    &:hover {
        background-color: ${accentColorRgb};
    }
`

const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
}

const CalendarComponent = () => {
    const currentDate = new Date()
    const [displayedYear, setDisplayedYear] = useState(currentDate.getFullYear())
    const [displayedMonth, setDisplayedMonth] = useState(currentDate.getMonth())
    const [selectedDate, setSelectedDate] = useState(currentDate)

    const calendarRef = useRef(null) // Ссылка на контейнер календаря

    const monthsToShow = []
    for (let i = -3; i <= 3; i++) {
        monthsToShow.push(new Date(displayedYear, displayedMonth + i))
    }

    const handleDateClick = (day, month, year) => {
        setSelectedDate(new Date(year, month, day))
    }

    // UseEffect для прокрутки к текущей дате
    useEffect(() => {
        const today = new Date()
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
    }, [displayedYear, displayedMonth])

    return (
        <CalendarSection>
            {/* <ScrollContainer> */}
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
                                    const isSelected = selectedDate.getDate() === dateNum && selectedDate.getMonth() === month && selectedDate.getFullYear() === year

                                    return (
                                        <DayCell key={day} data-date={`${year}-${month}-${dateNum}`} isToday={isToday} isSelected={isSelected} onClick={() => handleDateClick(dateNum, month, year)}>
                                            {dateNum}
                                        </DayCell>
                                    )
                                })}
                            </CalendarGrid>
                        </MonthContainer>
                    )
                })}
            </Container>
            {/* </ScrollContainer> */}
        </CalendarSection>
    )
}

export default CalendarComponent
