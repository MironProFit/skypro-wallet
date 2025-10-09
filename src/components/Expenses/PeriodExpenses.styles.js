import styled from 'styled-components'
import { ContainerTitle, SectionSubTitle } from '../../styles/GlobalStyled'

export const ChartContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(10px, 2vw, 32px);
    height: 100%;
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
`

export const ChartCategory = styled(ContainerTitle)``
