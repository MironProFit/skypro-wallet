import { useAuthContext } from '../../contexts/AuthContext'
import { Container } from '../../styles/GlobalStyled'

import { HeaderContainer, HeaderLogo, HeaderNav, LinkContainer, NavLinkButton, StyledLinkGroup } from './Header.styles'

function Header(onLogout) {
    const { isAuth } = useAuthContext()
    return (
        <HeaderContainer>
            <Container>
                <HeaderNav>
                    <HeaderLogo>
                        <img src="/image/Wallet_logo.png" alt="Logo" />
                    </HeaderLogo>
                    {isAuth && (
                        <>
                            <StyledLinkGroup>
                                <LinkContainer>
                                    <NavLinkButton to={'/expenses'}>Мои расходы</NavLinkButton>
                                </LinkContainer>
                                <LinkContainer>
                                    <NavLinkButton to={'/analysis'}>Анализ расходов</NavLinkButton>
                                </LinkContainer>
                            </StyledLinkGroup>
                            <LinkContainer>
                                <NavLinkButton onClick={onLogout}>Выйти</NavLinkButton>
                            </LinkContainer>
                        </>
                    )}
                </HeaderNav>
            </Container>
        </HeaderContainer>
    )
}

export default Header
