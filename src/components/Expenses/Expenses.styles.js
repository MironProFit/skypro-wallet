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
export const FormWrapper = styled.div``
export const FormGroup = styled.div`
    margin-bottom: 24px;

    display: flex;
    flex-direction: column;
`
export const FormLabel = styled.label`
    margin-bottom: 16px;
`
export const FormInput = styled.input`
    position: relative;
    color: ${textColor};
    max-width: 313px;
    height: 39px;
    padding: 12px;
    border-radius: 6px;
    background: ${primaryColor};
    border: 1px solid ${borderColor};
    transition: 0.3s;

    &:focus {
        outline: none;
        border: 1px solid ${accentColor};
    }

    &::placeholder {
        color: ${textColor};
    }
    ${({ $before }) =>
        $before &&
        css`
            -moz-appearance: textfield; /* Firefox */
            &::-webkit-inner-spin-button,
            &::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        `}
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

export const FormBtn = styled.div``
export const AddButton = styled(PrimaryButton)``
