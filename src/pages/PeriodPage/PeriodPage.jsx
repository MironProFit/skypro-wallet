import { useNavigate } from 'react-router-dom'
import CalendarComponent from '../../components/Calendar/Calendar'
import { useAppCoontext } from '../../contexts/AppContext'
import { Container, ContainerGroup, FlexContainer, PageTitle } from '../../styles/GlobalStyled'
import { AddPeriod } from '../../components/Expenses/PeriodExpenses.styles'

function PeriodPage() {
    const { isMobile } = useAppCoontext()
    const navigate = useNavigate()

    const handleConfirmSelectedPeriod = () => {
        console.log('кнопка нажата')
        alert('Выбор подтвержден')
        navigate('/analysis')
    }

    return (
        <>
            <Container $isMobile={isMobile}>
                <CalendarComponent />
                {isMobile && (
                    <FlexContainer>
                        <AddPeriod onClick={handleConfirmSelectedPeriod}>Выбрать другой период</AddPeriod>
                    </FlexContainer>
                )}
            </Container>
        </>
    )
}

export default PeriodPage
