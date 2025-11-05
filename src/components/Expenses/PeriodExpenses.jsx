import { useEffect, useState } from 'react'
import { useAppContext } from '../../contexts/AppContext'
import { ContainerTitle, FlexContainer, SectionTitle } from '../../styles/GlobalStyled'
import { ExpensesSection } from './Expenses.styles'
import { formattedDate } from '../../utils/date-fns'
import { AddPeriod, ChartCategory, ChartColor, ChartContainer, ChartItem, PeriodSubTitle } from './PeriodExpenses.styles'
import { categoryList } from '../../data/CategoryList'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { formatNum } from '../../utils/formatNum'

function PeriodExpenses({ $flex }) {
    const { startDate, endDate, isMobile } = useAppContext()
    const { userData } = useAuthContext()
    const [totalSum, setTotalSum] = useState()

    // Функция для проверки, входит ли дата в диапазон
    const isInRange = (dateStr) => {
        if (!startDate || !endDate || !dateStr) return true // если период не выбран, показываем всё
        const date = new Date(dateStr)
        return date >= new Date(startDate) && date <= new Date(endDate)
    }

    // Фильтруем userData по диапазону дат
    const filteredData = userData.filter((d) => isInRange(d.date))

    useEffect(() => {
        const sumAll = filteredData.reduce((acc, d) => acc + d.sum, 0)
        setTotalSum(sumAll)
    }, [filteredData])

    return (
        <ExpensesSection $isMobile={isMobile} $flex={$flex}>
            <SectionTitle $isMobile={isMobile}>{formatNum(totalSum)} ₽</SectionTitle>
            <PeriodSubTitle>{startDate && endDate ? `Расходы за: ${formattedDate(startDate)} - ${formattedDate(endDate)}` : 'Выбирите период'}</PeriodSubTitle>
            <ChartContainer $isMobile={isMobile}>
                {categoryList.map((category) => {
                    // ищем соответствующие данные по категории в отфильтрованных данных
                    const data = filteredData.find((d) => d.category === category.category)

                    const sumValue = data ? data.sum : 0
                    const maxSum = Math.max(...filteredData.map((d) => d.sum), 1)
                    const heightPercent = (sumValue / maxSum) * 100
                    const adjustedHeightPercent = heightPercent === 0 ? '10px' : heightPercent
                    const barHeight = heightPercent > 0 ? `calc(${heightPercent}% + 10px)` : '10px'

                    return (
                        <ChartItem key={category.category} $>
                            <ContainerTitle $isMobile={isMobile}>{formatNum(sumValue)} ₽</ContainerTitle>
                            <ChartColor $isMobile={isMobile} $color={category.color} style={{ height: barHeight }}></ChartColor>
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
