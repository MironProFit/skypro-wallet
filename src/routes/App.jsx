import { Wrapper } from '../styles/GlobalStyled'
import { GlobalStyle } from '../styles/GlobalStyles'
import AppRoutes from './AppRoutes'

function App() {
    return (
        <>
            <GlobalStyle />

            <Wrapper>
                <AppRoutes />
            </Wrapper>
        </>
    )
}

export default App
