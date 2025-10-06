import CalendarComponent from '../../components/Calendar/Calendar'
import NewExpense from '../../components/Expenses/NewExpense'
import PeriodExpenses from '../../components/Expenses/PeriodExpenses'
import { Container, ContainerGroup, PageTitle, Section, SectionTitle } from '../../styles/GlobalStyled'

function Analysis() {
    return (
        <>
            <Container>
                <PageTitle>Анализ расходов</PageTitle>
                <ContainerGroup>
                    <CalendarComponent />
                    <PeriodExpenses />
                </ContainerGroup>
            </Container>
        </>
    )
}

export default Analysis
