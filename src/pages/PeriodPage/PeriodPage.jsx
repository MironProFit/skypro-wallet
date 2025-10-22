import CalendarComponent from '../../components/Calendar/Calendar'
import { useAppCoontext } from '../../contexts/AppContext'
import { Container, ContainerGroup, PageTitle } from '../../styles/GlobalStyled'

function PeriodPage() {
    const { isMobile } = useAppCoontext()
    return (
        <>
            <Container $isMobile={isMobile}>
                <CalendarComponent />
            </Container>
        </>
    )
}

export default PeriodPage
