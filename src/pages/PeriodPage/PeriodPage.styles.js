import styled, { css } from 'styled-components'
import { primaryColor } from '../../styles/Mexins.style'

export const PeriodWrapper = styled.div`
    ${({ $isMobile }) =>
        $isMobile &&
        css`
            display: flex;
            justify-content: center;
            background-color: ${primaryColor};
        `}
`

export const PeriodContainer = styled.div`
    ${({ $isMobile }) =>
        $isMobile &&
        css`
            max-width: 450px;
            display: flex;
            overflow: auto;
            flex-direction: column;
        `}
`
