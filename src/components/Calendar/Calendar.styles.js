import styled from 'styled-components'
import { accentColorRgb, borderColor, primaryColor, secondaryColor, textColor, thumbColor } from '../../styles/Mexins.style'
import { Section } from '../../styles/GlobalStyled'

export const CalendarSection = styled(Section)`
    /* min-width: 380px; */
    flex: 1;
`

// Styled-components
export const CalendarWrapper = styled.div`
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

export const CalendarTitle = styled.div`
    padding-bottom: 16px;
    padding-top: 24px;
`

export const DaysOfWeek = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${primaryColor};
    padding: 5px 0;
    border-bottom: 2px solid ${borderColor};
    position: sticky;
    top: 0;
    z-index: 1;
`

export const DayName = styled.div`
    flex: 1;
    text-align: center;
    font-size: 0.9em;
    color: ${borderColor};
`

export const MonthContainer = styled.div`
    padding: 10px;
`

export const MonthHeader = styled.h3`
    display: flex;
    text-align: center;
    margin: 10px 0;
    font-size: 1em;
`

export const CalendarGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, clamp(10px, 4vw, 40px));
    grid-auto-rows: 40px;
    gap: clamp(1px, 4.5vw, 6px);
    /* gap: 6px; */
`

export const DayCell = styled.div`
    width: clamp(10px, 4vw, 40px);
    height: clamp(10px, 4vw, 40px);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: ${({ $isSelected, $isToday, $isInRange }) =>
        $isSelected
            ? accentColorRgb
            : $isToday && $isInRange
            ? 'orange' // Цвет для сегодняшнего дня, если он в диапазоне
            : $isToday
            ? thumbColor
            : secondaryColor}; // Цвет для сегодняшнего дня, если он не в диапазоне
    color: ${({ $isToday }) => ($isToday ? primaryColor : textColor)};
    cursor: pointer;

    &:hover {
        background-color: ${accentColorRgb};
    }
`
