import styled, { css } from 'styled-components'

export const FilterWrapper = styled.div`
    display: none;
    position: absolute;
    width: 100px;
    height: 100px;
    background: red;

    /* ${({ $isOpenFilter }) =>
        $isOpenFilter &&
        css`
            display: flex;
        `} */

    ${({ $active }) =>
        $active &&
        css`
            display: flex;

            background-color: green;
        `}
`

export const FilterModal = styled.div`
    display: none;
    height: 100px;
    width: 100px;
    background: red;
    position: absolute;
`
