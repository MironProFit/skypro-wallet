import { Container, ContainerGroup, PageTitle } from '../../styles/GlobalStyled'
import ExpensesTable from '../../components/Expenses/TableExpenses'
import NewExpense from '../../components/Expenses/NewExpense'
import { useAppContext } from '../../contexts/AppContext'
import { ExpensesHeaderLink, ExpensesHeaderTitle, LinkIcon, LinkWrapper } from '../../components/Expenses/Expenses.styles'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import plusIcon from '../../assets/image/icon/add-circle.svg'

function ExpensesPage() {
    const { isMobile } = useAppContext()
    const location = useLocation()
    const [isExpensesPage, setIsExpensesPage] = useState(false)

    useEffect(() => {
        location.pathname === '/expenses' && isMobile ? setIsExpensesPage(true) : setIsExpensesPage(false)
    }, [location.pathname, isMobile])

    if (isMobile) {
        // --- Мобильная версия ---
        return (
            <Container $isMobile={isMobile}>
                <ExpensesHeaderTitle $isMobile={isMobile} $isExpensesPage={isExpensesPage}>
                    <PageTitle style={{ order: 1 }} $isMobile={isMobile}>
                        Мои расходы
                    </PageTitle>
                    <LinkWrapper to={'/expenses/new'} style={{ order: 2 }}>
                        <LinkIcon src={plusIcon} alt="+"></LinkIcon>
                        <ExpensesHeaderLink style={{ order: 2 }} $isExpensesPage={isExpensesPage} $isMobile={isMobile}>
                            Новый расход
                        </ExpensesHeaderLink>
                    </LinkWrapper>
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
