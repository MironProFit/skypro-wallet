import { useEffect } from 'react'
import { useAppCoontext } from '../../contexts/AppContext'
import { ContainerTitle, FlexContainer, SectionTitle } from '../../styles/GlobalStyled'
import { ExpensesSection } from './Expenses.styles'
import { formattedDate } from '../../utils/date-fns'
import { AddPeriod, ChartCategory, ChartColor, ChartContainer, ChartItem, PeriodSubTitle } from './PeriodExpenses.styles'
import { categoryList } from '../../data/CategoryList'

function PeriodExpenses({ $flex }) {
    const { startDate, setStartDate, endDate, setEndDate, isMobile } = useAppCoontext()

    return (
        <ExpensesSection $flex={$flex}>
            <SectionTitle $isMobile={isMobile}>65 192 ₽</SectionTitle>
            <PeriodSubTitle>{startDate && endDate ? `Расходы за: ${formattedDate(startDate)} - ${formattedDate(endDate)}` : 'Выбирите период'}</PeriodSubTitle>
            <ChartContainer $isMobile={isMobile}>
                {categoryList.map((item) => (
                    <ChartItem>
                        <ContainerTitle $isMobile={isMobile}>21 990 ₽</ContainerTitle>
                        <ChartColor $isMobile={isMobile} $color={item.color}></ChartColor>
                        <ChartCategory $isMobile={isMobile}>Eda</ChartCategory>
                    </ChartItem>
                ))}
            </ChartContainer>
            <FlexContainer>
                <AddPeriod>Выбрать другой период</AddPeriod>
            </FlexContainer>
        </ExpensesSection>
    )
}

export default PeriodExpenses
