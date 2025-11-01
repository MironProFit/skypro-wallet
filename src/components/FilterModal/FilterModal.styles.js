import styled, { css } from 'styled-components'
import { primaryColor, shadowColor, successColor } from '../../styles/Mexins.style'

// export const FilterWrapper = styled.div`
//     display: none;
//     position: absolute;
//     background: ${primaryColor};
//     width: 30%;
//     padding: 20px;
//     left: 25%;
//     border-radius: 15px;
//     box-shadow: 0px 0px 20px 20px ${shadowColor};

//     /* ${({ $isOpenFilter }) =>
//         $isOpenFilter &&
//         css`
//             display: flex;
//         `} */

//     ${({ $active }) =>
//         $active &&
//         css`
//             display: flex;
//         `}
// `

export const FilterWrapper = styled.div`
    position: fixed;
    top: 25%;
    /* overflow: hidden; */
    opacity: 0;
    visibility: hidden;
    display: flex;

    background: ${primaryColor};
    width: 80%; /* ширина для всплывающего окна */
    max-width: 300px; /* максимум ширины */
    padding: 20px;
    /* top: 50px; */
    right: 50%; /* по горизонтали, смещение */
    transform: translateX(50%); /* чтобы центрировать по горизонтали */
    border-radius: 15px;
    box-shadow: 0px 0px 20px ${shadowColor};
    z-index: 999; /* чтобы было поверх других элементов */
    transition: 0.3s;

    ${({ $active }) =>
        $active &&
        css`
            opacity: 1;
            visibility: visible;
            flex-direction: column;
        `}
`

export const FilterArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`

export const FilterModal = styled.div`
    display: none;
    height: 100px;
    width: 100px;
    background: red;
    position: absolute;
`
