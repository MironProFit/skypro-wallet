import ExpensesTable from '../../components/Expenses/TableExpenses'
import NewExpense from '../../components/Expenses/NewExpense'
import { Container, ContainerGroup, PageTitle } from '../../styles/GlobalStyled'
import { useAppCoontext } from '../../contexts/AppContext'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ExpensesHeaderLink, ExpensesHeaderTitle } from '../../components/Expenses/Expenses.styles'

function Expenses() {
    const { isMobile } = useAppCoontext()
    const [isExpensesPage, setIsExpensesPage] = useState(true)
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/newexpenses') {
            setIsExpensesPage(false)
        } else {
            setIsExpensesPage(true)
        }
    }, [location])

    const handleExpenses = () => {
        setIsExpensesPage(isExpensesPage ? false : true)
    }

    return !isMobile ? (
        <>
            <Container $isMobile={isMobile}>
                <PageTitle $isMobile={isMobile}>Мои расходы</PageTitle>
                <ContainerGroup>
                    <ExpensesTable $flex={2} />
                    <NewExpense $flex={1} />
                </ContainerGroup>
            </Container>
        </>
    ) : (
        <>
            <Container $isMobile={isMobile}>
                <ExpensesHeaderTitle $isExpensesPage={isExpensesPage} $isMobile={isMobile}>
                    <PageTitle $isExpensesPage={isExpensesPage} $isMobile={isMobile}>
                        {isExpensesPage ? 'Мои расходы' : 'Новый расход'}
                    </PageTitle>
                    <ExpensesHeaderLink $isExpensesPage={isExpensesPage} onClick={handleExpenses}>
                        {isExpensesPage ? 'Новый расход' : 'Мои расходы'}
                    </ExpensesHeaderLink>
                </ExpensesHeaderTitle>

                {isExpensesPage ? <ExpensesTable /> : <NewExpense />}
            </Container>
        </>
    )
}

export default Expenses
