import styled, { css } from 'styled-components'
import { ContainerTitle, PrimaryButton, SectionSubTitle } from '../../styles/GlobalStyled'
import { primaryColor } from '../../styles/Mexins.style'

export const ChartContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);

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
    justify-content: flex-end;
    flex-direction: column;
    align-items: center;
    flex: 1 1 auto;
    min-width: 0;
`
export const PeriodSubTitle = styled(SectionSubTitle)`
    margin-bottom: 21px;
`

export const ChartWrapColor = styled.div`
    display: flex;
    align-items: flex-end;
    height: 100%;
    height: 300px;
    flex-grow: 1;
    flex-shrink: 1;
    width: 100%;
    margin: 12px 0;
`

export const ChartColor = styled.div`
    /* display: flex;
    align-items: flex-end;
    height: 100%;
    height: 300px; */
    /* flex-grow: 1;
    flex-shrink: 1; */
    width: 100%;
    margin: 12px 0;

    background-color: ${({ $color }) => $color};
    border-radius: 12px;

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
