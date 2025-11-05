import { useLocation, useNavigate } from 'react-router-dom'
import CalendarComponent from '../../components/Calendar/Calendar'
import { useAppContext } from '../../contexts/AppContext'
import { FlexContainer } from '../../styles/GlobalStyled'
import { AddPeriod } from '../../components/Expenses/PeriodExpenses.styles'
import { useEffect } from 'react'
import { PeriodContainer, PeriodWrapper } from './PeriodPage.styles'

function PeriodPage() {
    const { startDate, endDate, isMobile } = useAppContext()

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!isMobile && location.pathname === '/analysis/period') {
            navigate('/analysis')
        }
    }, [location.pathname, isMobile])

    const handleConfirmSelectedPeriod = () => {
        navigate('/analysis')
    }

    return (
        <>
            <PeriodWrapper $isMobile={isMobile}>
                <PeriodContainer $isMobile={isMobile}>
                    <CalendarComponent />
                    {isMobile && (
                        <FlexContainer>
                            <AddPeriod disabled={startDate === endDate} onClick={handleConfirmSelectedPeriod}>
                                Выбрать другой период
                            </AddPeriod>
                        </FlexContainer>
                    )}
                </PeriodContainer>
            </PeriodWrapper>
        </>
    )
}

export default PeriodPage
