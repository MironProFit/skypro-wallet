import { useEffect } from 'react'
import { useAppCoontext } from '../../contexts/AppContext'
import { ContainerTitle, FormWrapper, SectionSubTitle, SectionTitle } from '../../styles/GlobalStyled'
import { ExpensesSection } from './Expenses.styles'
import { formattedDate } from '../../utils/date-fns'
import { ChartCategory, ChartColor, ChartContainer, ChartItem, PeriodSubTitle } from './PeriodExpenses.styles'
import { categoryList } from '../../data/CategoryList'

function PeriodExpenses({ $flex }) {
    const { startDate, setStartDate, endDate, setEndDate } = useAppCoontext()
    useEffect(() => {}, [startDate, endDate])

    return (
        <ExpensesSection $flex={$flex}>
            <SectionTitle style={{ marginBottom: '32px' }}>65 192 ₽</SectionTitle>
            <PeriodSubTitle>{startDate && endDate ? `Расходы за: ${formattedDate(startDate)} - ${formattedDate(endDate)}` : 'Выбирите период'}</PeriodSubTitle>
            <ChartContainer>
                {categoryList.map((item) => (
                    <ChartItem>
                        <ContainerTitle>21 990 ₽</ContainerTitle>
                        <ChartColor $width={'200'} $color={item.color}></ChartColor>
                        <div>
                            <ChartCategory>Eda</ChartCategory>
                        </div>
                    </ChartItem>
                ))}
            </ChartContainer>
            <FormWrapper></FormWrapper>
        </ExpensesSection>
    )
}

export default PeriodExpenses
