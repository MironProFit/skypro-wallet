import styled, { css } from 'styled-components'
import { accentColorRgb, borderColor, primaryColor, secondaryColor, textColor, thumbColor } from '../../styles/Mexins.style'
import { Section } from '../../styles/GlobalStyled'

export const CalendarSection = styled(Section)`
    flex: 1;
    overflow: hidden;

    ${({ $isMobile }) =>
        $isMobile &&
        css`
            padding: 0;
            background: none;
            box-shadow: none;
        `}
    ${({ $isFilter }) =>
        $isFilter &&
        css`
            padding: 0;
            background: none;
            box-shadow: none;
        `}
`

export const CalendarWrapper = styled.div`
    width: 100%;
    max-height: 500px;
    height: 100%;
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

    ${({ $isMobile }) =>
        $isMobile &&
        css`
            width: 450px;
        `}

    ${({ $isFilter }) =>
        $isFilter &&
        css`
            max-height: 250px;
        `}
`

export const CalendarTitle = styled.div`
    padding-top: 24px;
    padding-bottom: 16px;
    display: none;

    ${({ $isFilter }) =>
        $isFilter &&
        css`
            display: block;
        `}
`

export const DaysOfWeek = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${primaryColor};
    padding: 5px 0;
    position: sticky;
    top: 0;
    z-index: 1;

    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 200%;
        height: 1px;
        background-color: ${borderColor};
        z-index: 2; /* Обеспечить отображение линии поверх других элементов */
    }

    ${({ $isMobile }) =>
        $isMobile &&
        css`
            display: grid;
            justify-content: center;
            grid-template-columns: repeat(7, clamp(10px, 11vw, 46px));
        `}

    ${({ $isFilter }) =>
        $isFilter &&
        css`
            display: grid;
            justify-content: center;
            gap: 13px;
            grid-template-columns: repeat(7, 21px);
        `}
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
    justify-content: center;
    margin: 10px 0;
    font-size: 1em;
`

export const MonthWrapper = styled.div`
    display: flex;
    justify-content: center;
`

export const CalendarGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, clamp(10px, 3vw, 40px));
    /* grid-auto-rows: clamp(20px, 3vw, 40px); */
    gap: clamp(1px, 4.5vw, 6px);

    ${({ $isMobile }) =>
        $isMobile &&
        css`
            grid-template-columns: repeat(7, clamp(10px, 9vw, 40px));
        `}

    ${({ $isFilter }) =>
        $isFilter &&
        css`
            gap: 12px;
            column-gap: 13px;
            row-gap: 3px;
            grid-template-columns: repeat(7, 21px);
        `}
`

export const DayCell = styled.div`
    width: clamp(10px, 3vw, 40px);
    height: clamp(10px, 3vw, 40px);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: ${({ $isSelected, $isToday, $isInRange, $isMobile }) => ($isSelected ? accentColorRgb : $isToday && $isInRange ? 'orange' : $isToday ? thumbColor : secondaryColor)};
    color: ${({ $isToday }) => ($isToday ? primaryColor : textColor)};
    cursor: pointer;

    &:hover {
        background-color: ${accentColorRgb};
    }

    ${({ $isMobile }) =>
        $isMobile &&
        css`
            width: clamp(10px, 9vw, 40px);
            height: clamp(10px, 9vw, 40px);
        `}

    ${({ $isFilter }) =>
        $isFilter &&
        css`
            width: 30px;
            height: 30px;
        `}
`
