import CalendarComponent from '../../components/Calendar/Calendar'
import PeriodExpenses from '../../components/Expenses/PeriodExpenses'
import { useAppContext } from '../../contexts/AppContext'
import { Container, ContainerGroup, PageTitle } from '../../styles/GlobalStyled'

function AnalysisPage() {
    const { isMobile } = useAppContext()

    if (isMobile) {
        // --- Мобильная версия ---
        return (
            <Container $isMobile={isMobile}>
                <PageTitle style={{ paddingTop: '24px' }} $isMobile={isMobile}>
                    Анализ расходов
                </PageTitle>
                <PeriodExpenses />
            </Container>
        )
    } else {
        // --- ПК версия ---
        return (
            <Container $isMobile={isMobile}>
                <PageTitle $isMobile={isMobile}>Анализ расходов</PageTitle>
                <ContainerGroup>
                    <CalendarComponent $flex={1} />
                    <PeriodExpenses $flex={2} />
                </ContainerGroup>
            </Container>
        )
    }
}

export default AnalysisPage
