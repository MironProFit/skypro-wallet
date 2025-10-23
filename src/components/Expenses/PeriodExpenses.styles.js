import styled, { css } from 'styled-components'
import { ContainerTitle, PrimaryButton, SectionSubTitle } from '../../styles/GlobalStyled'
import { primaryColor } from '../../styles/Mexins.style'

export const ChartContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: clamp(6px, 3%, 32px);
    height: 100%;

    ${({ $isMobile }) =>
        $isMobile &&
        css`
            gap: 6px;
        `}
`

export const ChartItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 1 auto;
    min-width: 0;
`
export const PeriodSubTitle = styled(SectionSubTitle)`
    margin-bottom: 21px;
`

export const ChartColor = styled.div`
    margin: 12px 0;
    background-color: ${({ $color }) => $color};
    border-radius: 12px;
    height: 300px;

    flex-grow: 1;
    flex-shrink: 1;
    width: 100%;

    /* width: 52px; */

    ${({ $isMobile }) =>
        $isMobile &&
        css`
            min-width: 20px;
        `}
`

export const ChartCategory = styled(ContainerTitle)``

export const AddPeriod = styled(PrimaryButton)``
