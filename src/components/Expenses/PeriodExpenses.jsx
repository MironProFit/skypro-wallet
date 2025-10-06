import { useEffect } from 'react'
import { useAppCoontext } from '../../contexts/AppContext'
import {ContainerTitle, FormWrapper, SectionSubTitle, SectionTitle } from '../../styles/GlobalStyled'
import {  ExpensesSection } from './Expenses.styles'
import { formattedDate } from '../../utils/date-fns'
import { ChartColor, ChartContainer, ChartItem } from './PeriodExpenses.styles'

function PeriodExpenses() {
    const { startDate, setStartDate, endDate, setEndDate } = useAppCoontext()
    useEffect(() => {
        console.log(startDate, endDate)
    }, [startDate, endDate])
    
    return (
        <ExpensesSection>
            <SectionTitle style={{ marginBottom: '32px' }}>65 192 ₽</SectionTitle>
            <SectionSubTitle>{startDate && endDate ? `Расходы за: ${formattedDate(startDate)} - ${formattedDate(endDate)}` : 'Выбирите период'}</SectionSubTitle>
           <ChartContainer>
            <ChartItem >
                <ContainerTitle>21 990 ₽</ContainerTitle>
                <ChartColor></ChartColor>
                <ChartCategory></ChartCategory>
            </ChartItem>
           </ChartContainer>
            <FormWrapper></FormWrapper>
        </ExpensesSection>
    )
}

export default PeriodExpenses
