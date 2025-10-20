import CalendarComponent from '../../components/Calendar/Calendar'
import NewExpense from '../../components/Expenses/NewExpense'
import PeriodExpenses from '../../components/Expenses/PeriodExpenses'
import { useAppCoontext } from '../../contexts/AppContext'
import { Container, ContainerGroup, PageTitle, Section, SectionTitle } from '../../styles/GlobalStyled'

function Analysis() {
    const { isMobile } = useAppCoontext()
    console.log(isMobile)
    return !isMobile ? (
        <>
            <Container>
                <PageTitle $isMobile={isMobile}>Анализ расходов</PageTitle>
                <ContainerGroup>
                    <CalendarComponent $flex={1} />
                    <PeriodExpenses $flex={2} />
                </ContainerGroup>
            </Container>
        </>
    ) : (
        <>
            <Container $isMobile={isMobile}>
                <PageTitle $isMobile={isMobile}>Анализ расходов</PageTitle>
                <ContainerGroup>
                    <PeriodExpenses />
                </ContainerGroup>
            </Container>
            
        </>
    )
}

export default Analysis
