import { Container, ContainerGroup, PageTitle } from '../../styles/GlobalStyled'
import ExpensesTable from '../../components/Expenses/TableExpenses'
import NewExpense from '../../components/Expenses/NewExpense'
import { useAppCoontext } from '../../contexts/AppContext'
import { ExpensesHeaderLink, ExpensesHeaderTitle } from '../../components/Expenses/Expenses.styles'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

function ExpensesPage() {
    const { isMobile } = useAppCoontext()
    const location = useLocation()
    const [isExpensesPage, setIsExpensesPage] = useState()

    useEffect(() => {
        location.pathname === '/expenses' && isMobile ? setIsExpensesPage(true) : setIsExpensesPage(false)
        console.log(location.pathname === '/expenses' && isMobile)
    }, [location, isMobile])

    if (isMobile) {
        // --- Мобильная версия ---
        return (
            <Container $isMobile={isMobile}>
                <ExpensesHeaderTitle $isMobile={isMobile} $isExpensesPage={isExpensesPage}>
                    <PageTitle style={{ order: 1 }} $isMobile={isMobile}>
                        Мои расходы
                    </PageTitle>
                    <ExpensesHeaderLink to={'/expenses/new'} style={{ order: 2 }} $isExpensesPage={isExpensesPage} $isMobile={isMobile}>
                        Новый расход
                    </ExpensesHeaderLink>
                </ExpensesHeaderTitle>
                <ExpensesTable />
            </Container>
        )
    } else {
        // --- ПК версия ---
        return (
            <Container $isMobile={isMobile}>
                <PageTitle $isMobile={isMobile}>Мои расходы</PageTitle>
                <ContainerGroup>
                    <ExpensesTable $flex={2} />
                    <NewExpense $flex={1} />
                </ContainerGroup>
            </Container>
        )
    }
}

export default ExpensesPage
