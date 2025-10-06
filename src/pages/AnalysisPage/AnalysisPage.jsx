import CalendarComponent from '../../components/Calendar/Calendar'
import { Container, ContainerGroup, PageTitle } from '../../styles/GlobalStyled'

function Analysis() {
    return (
        <>
            <Container>
                <PageTitle>Анализ расходов</PageTitle>
                <ContainerGroup>
                    <CalendarComponent 
                    // $flex={2} 
                    />
                    {/* <CalendarComponent $flex={2} /> */}
                    {/* // $flex={2} */}
                    {/* <NewExpense $flex={1} /> */}
                </ContainerGroup>
            </Container>
        </>
    )
}

export default Analysis
