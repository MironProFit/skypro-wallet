import styled, { css } from 'styled-components'
import { ContainerTitle, PrimaryButton, SectionSubTitle } from '../../styles/GlobalStyled'
import { primaryColor } from '../../styles/Mexins.style'

export const ChartContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(10px, 2vw, 32px);
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
`
export const PeriodSubTitle = styled(SectionSubTitle)`
    margin-bottom: 21px;
`

export const ChartColor = styled.div`
    margin: 12px 0;
    background-color: ${({ $color }) => $color};
    border-radius: 12px;
    height: 300px;
    width: clamp(20px, 6vw, 94px);

    ${({ $isMobile }) =>
        $isMobile &&
        css`
            width: 52px;
        `}
`

export const ChartCategory = styled(ContainerTitle)``

export const AddPeriod = styled(PrimaryButton)``

