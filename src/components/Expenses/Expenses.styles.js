import styled, { css } from 'styled-components'
import { accentColor, accentColorRgb, borderColor, primaryColor, secondaryColor, successColor, textColor } from '../../styles/Mexins.style'
import { FormGroup, FormInput, PrimaryButton, Section } from '../../styles/GlobalStyled'
import { Link } from 'react-router-dom'

export const ExpensesSection = styled(Section)`
    flex-direction: column;
    display: flex;
    flex: ${({ $flex }) => $flex || '1'};
    overflow: hidden;

    ${({ $isMobile }) =>
        $isMobile &&
        css`
            overflow: visible;
        `}
`

export const ExpensesHeader = styled.div`
    display: flex;
    gap: 14px;

    ${({ $isMobile }) =>
        $isMobile &&
        css`
            justify-content: space-around;
        `}

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
export const ExpensesHeaderTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 36px;
    padding-bottom: 32px;

    ${({ $isMobile }) =>
        $isMobile &&
        css`
            padding-top: 24px;
            padding-bottom: 22px;
        `}

    ${({ $isExpensesPage }) =>
        !$isExpensesPage &&
        css`
            flex-direction: column;
            align-items: inherit;
        `}
`
export const ExpensesHeaderLink = styled(Link)`
    cursor: pointer;
    position: relative;

    &::before {
        position: absolute;
        content: '';
        background-image: url(${({ $isExpensesPage }) => ($isExpensesPage ? 'image/icon/add-circle.svg' : 'image/icon/arrow-left.svg')});
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        left: -25px;
        top: 50%;
        transform: translateY(-50%);

        width: 14px;
        height: 14px;
    }
    ${({ $isExpensesPage }) =>
        !$isExpensesPage &&
        css`
            left: 20px;
            cursor: pointer;
            position: relative;
            order: 1;
            &::before {
                left: -20px;
            }
        `}
`

export const HeaderCell = styled.div`
    color: ${borderColor};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    box-sizing: border-box;

    ${({ $isHidden, $isMobile }) =>
        $isHidden &&
        $isMobile &&
        css`
            display: none;
        `};
`

export const ExpensesList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 14px;
`

export const ExpensesItem = styled.li`
    display: flex;
    gap: 14px;
    background-color: transparent;
    cursor: pointer;
    transition: 0.3s;
    padding: 0 10px;
    border-radius: 10px;
    justify-content: space-between;

    &:hover {
        background-color: ${accentColorRgb};
    }
`

export const ExpensesFormGroup = styled(FormGroup)`
    margin-bottom: 24px;
`

export const ItemCell = styled.div`
    white-space: nowrap;
    text-overflow: ellipsis;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
`
export const ItemCellImg = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    cursor: default;

    ${({ $isMobile }) =>
        $isMobile &&
        css`
            display: none;
        `}

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

export const CategoryButton = styled.div``
export const CategoryContainer = styled.div`
    cursor: pointer;
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
    &:hover {
        background: ${accentColorRgb};
    }
`
export const CategoryImg = styled.div`
    display: flex;
    width: 14px;
    height: 14px;
`
export const CategoryWrap = styled.div`
    cursor: pointer;
    gap: 6px;
    display: flex;
    flex-wrap: wrap;
`
export const CategoryDesc = styled.p`
    transition: 0.3s;
    color: ${({ $active }) => $active};
`

export const AddButton = styled(PrimaryButton)``

export const FormInputSum = styled(FormInput)`
    padding-right: 25px;
    width: 100%;
    box-sizing: border-box;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`

export const RubleIcon = styled.div`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: ${textColor};
    font-weight: normal;

    z-index: 1;
`
export const FormInputSumWrapper = styled.div`
    position: relative;
    display: inline-block;
    width: 100%;
    &::before {
        content: '₽';
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        color: ${textColor};
        font-weight: normal;
    }
`
