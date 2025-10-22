import { useAppCoontext } from '../../contexts/AppContext'
import { Container, PageTitle } from '../../styles/GlobalStyled'
import NewExpense from '../../components/Expenses/NewExpense'
import { Navigate, useLocation } from 'react-router-dom' // Для перенаправления с ПК
import { ExpensesHeaderLink } from '../../components/Expenses/Expenses.styles'
import { useEffect, useState } from 'react'

function NewExpensePage() {
    const { isMobile } = useAppCoontext()
    const location = useLocation()
    const [isExpensesPage, setIsExpensesPage] = useState()

    useEffect(() => {
        location.pathname === '/expenses/new' ? setIsExpensesPage(false) : setIsExpensesPage(true)
    }, [location])

    if (!isMobile) {
        // Если на ПК, перенаправляем на /expenses (где форма рядом с таблицей)
        return <Navigate to="/expenses" replace />
    }

    // --- Мобильная версия ---
    return (
        <Container $isMobile={isMobile}>
            <ExpensesHeaderLink to={'/expenses'} $isExpensesPage={isExpensesPage} $isMobile={isMobile}>
                Мои расходы
            </ExpensesHeaderLink>
            <PageTitle $isMobile={isMobile}>Новый расход</PageTitle>

            <NewExpense $flex={1} />
        </Container>
    )
}

export default NewExpensePage
