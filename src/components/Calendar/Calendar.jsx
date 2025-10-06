import { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    max-width: 380px; /* Максимальная ширина */
    width: 100%; /* Ширина на экранах меньше 380px */
    height: 400px;
    overflow-y: auto;
    border: 1px solid #cccccc;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: relative; /* Позволяет фиксировать элементы внутри */
`

const DaysOfWeek = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #f7f7f7;
    padding: 5px 0;
    border-bottom: 2px solid #cccccc; /* Линия под заголовком дней недели */
    position: sticky; /* Фиксируем позицию */
    top: 0; /* Фиксируем в верхней части контейнера */
    z-index: 1; /* Обеспечиваем отображение поверх содержимого */
`

const DayName = styled.div`
    flex: 1;
    text-align: center;
    font-size: 0.9em; /* Адаптивный размер шрифта */
`

const MonthContainer = styled.div`
    padding: 10px;
`

const MonthHeader = styled.h3`
    text-align: center;
    margin: 10px 0;
    font-size: 1em; /* Адаптивный размер шрифта */
`

const CalendarGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start; /* Выравнивать влево */
`

const DayCell = styled.div`
    flex: 0 0 calc(14.2857% - 10px); /* 100% / 7 (7 дней в неделе) минус отступы */
    height: 40px; /* Высота ячейки */
    margin: 5px;
    box-sizing: border-box; /* Включает padding и border в ширину */
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%; /* Делаем ячейку круглой */
    background-color: ${({ isSelected, isToday }) => (isSelected ? '#4CAF50' : isToday ? '#2196F3' : 'white')};
    color: ${({ isSelected, isToday }) => (isSelected || isToday ? 'white' : 'black')};
    cursor: pointer;

    &:hover {
        background-color: #e3f2fd;
    }

    @media (max-width: 600px) {
        height: 30px; /* Меньшая высота ячейки на маленьких экранах */
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

    // Создаем массив месяцев для отображения
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

        // Сравниваем и scroll если текущая дата вне отображаемого месяца
        if (displayedYear === todayYear && displayedMonth === todayMonth) {
            // Прокрутка к контейнеру календаря
            if (calendarRef.current) {
                const todayCell = calendarRef.current.querySelector(`div[data-date='${today.getFullYear()}-${today.getMonth()}-${today.getDate()}']`)
                // Прокрутка только если элемент найден
                if (todayCell) {
                    todayCell.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }
            }
        }
    }, [displayedYear, displayedMonth])

    return (
        <Container ref={calendarRef}>
            <DaysOfWeek>
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
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
                            {date.toLocaleString('default', { month: 'long' })} {year}
                        </MonthHeader>
                        <CalendarGrid>
                            {Array.from({ length: effectiveFirstDay }).map((_, i) => (
                                <div key={i} style={{ flex: '1 0 calc(14.2857% - 10px)', height: '40px' }}></div>
                            ))}
                            {Array.from({ length: daysInMonth }).map((_, day) => {
                                const dateNum = day + 1
                                const isToday = currentDate.getDate() === dateNum && currentDate.getMonth() === month && currentDate.getFullYear() === year
                                const isSelected = selectedDate.getDate() === dateNum && selectedDate.getMonth() === month && selectedDate.getFullYear() === year

                                return (
                                    <DayCell
                                        key={day}
                                        data-date={`${year}-${month}-${dateNum}`} // Атрибут для идентификации ячейки по дате
                                        isToday={isToday}
                                        isSelected={isSelected}
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
    )
}

export default CalendarComponent
