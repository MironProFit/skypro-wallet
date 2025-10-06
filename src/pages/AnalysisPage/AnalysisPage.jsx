import CalendarComponent from '../../components/Calendar/Calendar'
import NewExpense from '../../components/Expenses/NewExpense'
import { Container, ContainerGroup, PageTitle, Section, SectionTitle } from '../../styles/GlobalStyled'

function Analysis() {
    return (
        <>
            <Container>
                <PageTitle>Анализ расходов</PageTitle>
                <ContainerGroup>
                        <CalendarComponent />

                    <NewExpense $flex={2} />
                </ContainerGroup>
            </Container>
        </>
    )
}

export default Analysis
