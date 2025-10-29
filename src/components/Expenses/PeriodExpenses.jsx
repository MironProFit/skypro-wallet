import { useEffect, useState } from 'react'
import { useAppContext } from '../../contexts/AppContext'
import { ContainerTitle, FlexContainer, SectionTitle } from '../../styles/GlobalStyled'
import { ExpensesSection } from './Expenses.styles'
import { formattedDate } from '../../utils/date-fns'
import { AddPeriod, ChartCategory, ChartColor, ChartContainer, ChartItem, ChartWrapColor, PeriodSubTitle } from './PeriodExpenses.styles'
import { categoryList } from '../../data/CategoryList'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { formatNum } from '../../utils/formatNum'

function PeriodExpenses({ $flex }) {
    const { startDate, setStartDate, endDate, setEndDate, isMobile } = useAppContext()
    const { userData } = useAuthContext()
    const [totalSum, setTotalSum] = useState()
    console.log(totalSum)

    useEffect(() => {
        const sumAll = userData.reduce((acc, d) => acc + d.sum, 0)
        setTotalSum(sumAll)
    }, [userData])

    return (
        <ExpensesSection $flex={$flex}>
            <SectionTitle $isMobile={isMobile}>{formatNum(totalSum)} ₽</SectionTitle>
            <PeriodSubTitle>{startDate && endDate ? `Расходы за: ${formattedDate(startDate)} - ${formattedDate(endDate)}` : 'Выбирите период'}</PeriodSubTitle>
            <ChartContainer $isMobile={isMobile}>
                {categoryList.map((category) => {
                    // ищем соответствующие данные по категории
                    const data = userData.find((d) => d.category === category.category)

                    const sumValue = data ? data.sum : 0
                    const maxSum = Math.max(...userData.map((d) => d.sum), 1)
                    const heightPercent = (sumValue / maxSum) * 100
                    const adjustedHeightPercent = heightPercent === 0 ? 2 : heightPercent

                    return (
                        <ChartItem key={category.category} $>
                            <ContainerTitle $isMobile={isMobile}>{formatNum(sumValue)} ₽</ContainerTitle>

                            <ChartColor $isMobile={isMobile} $color={category.color} style={{ height: `${adjustedHeightPercent}%` }}></ChartColor>

                            <ChartCategory $isMobile={isMobile}>{category.name}</ChartCategory>
                        </ChartItem>
                    )
                })}
            </ChartContainer>
            {isMobile && (
                <FlexContainer>
                    <Link to={'/analysis/period'}>
                        <AddPeriod>Выбрать другой период</AddPeriod>
                    </Link>
                </FlexContainer>
            )}
        </ExpensesSection>
    )
}

export default PeriodExpenses
