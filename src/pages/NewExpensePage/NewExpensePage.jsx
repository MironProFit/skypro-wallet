import { useAppContext } from '../../contexts/AppContext'
import { Container, PageTitle } from '../../styles/GlobalStyled'
import NewExpense from '../../components/Expenses/NewExpense'
import { Navigate, useLocation } from 'react-router-dom'
import { ExpensesHeaderLink, ExpensesHeaderTitle, LinkIcon, LinkWrapper } from '../../components/Expenses/Expenses.styles'
import { useEffect, useState } from 'react'

//img icon
import leftArrIcon from '../../assets/image/icon/arrow-left-icon.png'

function NewExpensePage() {
    const { isMobile } = useAppContext()
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
            <ExpensesHeaderTitle $isMobile={isMobile} $isExpensesPage={isExpensesPage}>
                <LinkWrapper to={'/expenses'} style={{ order: 2 }}>
                    <LinkIcon src={leftArrIcon} alt="+"></LinkIcon>
                    <ExpensesHeaderLink $isExpensesPage={isExpensesPage} $isMobile={isMobile}>
                        Мои расходы
                    </ExpensesHeaderLink>
                </LinkWrapper>

                <PageTitle $isMobile={isMobile}>Новый расход</PageTitle>
            </ExpensesHeaderTitle>

            <NewExpense $flex={1} />
        </Container>
    )
}

export default NewExpensePage
