import styled, { css } from 'styled-components'
import { accentColor, borderColor, primaryColor, secondaryColor, successColor, textColor } from '../../styles/Mexins.style'
import { PrimaryButton, Section } from '../../styles/GlobalStyled'

export const ExpensesSection = styled(Section)`
    flex-direction: column;
    display: flex;
    flex: ${({ $flex }) => $flex || '1'};
`

export const ExpensesHeader = styled.div`
    display: flex;
    gap: 14px;

    justify-content: space-between;
    position: relative;
    margin-bottom: 24px;
    &::before {
        position: absolute;
        content: '';
        width: 200%;
        height: 1px;
        left: 50%;
        transform: translateX(-50%);
        background-color: ${borderColor};
        bottom: -6px;
    }
`

export const HeaderCell = styled.div`
    flex: 1;
    color: ${borderColor};
`

export const ExpensesList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 14px;
`

export const ExpensesItem = styled.li`
    display: flex;
    gap: 14px;
    /* flex-direction: row; */
`

export const ItemCell = styled.div`
    white-space: nowrap;

    flex: 1;
`
export const ItemCellImg = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    & svg {
        path {
            fill: ${borderColor};
            transition: 0.3s;
        }
    }
    &:hover svg {
        path {
            fill: ${textColor};
        }
    }
`

export const CategoryButton = styled.div`
    /* background-color: green; */
    /* height: 31px;
    border-radius: 30px;
    color: ${textColor};
    display: flex; */
    /* flex-direction: row; */
`
export const CategoryContainer = styled.div`
    gap: 12px;
    height: 31px;
    border-radius: 30px;
    background: ${({ $active }) => $active};
    color: ${textColor};
    display: flex;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    transition: 0.3s;
`
export const CategoryImg = styled.div`
    display: flex;
    width: 14px;
    height: 14px;
`
export const CategoryWrap = styled.div`
    gap: 6px;
    display: flex;
    flex-wrap: wrap;
`
export const CategoryDesc = styled.p`
    transition: 0.3s;

    color: ${({ $active }) => $active};
`

export const AddButton = styled(PrimaryButton)``
