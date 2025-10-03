import ExpensesTable from '../../components/Expenses/ExpensesTable'
import NewExpense from '../../components/Expenses/NewExpense'
import { Container, ContainerGroup, PageTitle } from '../../styles/GlobalStyled'
function Expenses() {
    return (
        <>
            <Container>
                <PageTitle>Мои расходы</PageTitle>
                <ContainerGroup>
                    <ExpensesTable $flex={2} />
                    <NewExpense $flex={1} />
                </ContainerGroup>
            </Container>
        </>
    )
}

export default Expenses
