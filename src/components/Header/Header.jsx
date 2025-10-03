import { Link } from 'react-router-dom'
import { Container, StyledLink, Wrapper } from '../../styles/GlobalStyled'

import { HeaderContainer, HeaderLogo, HeaderNav, LinkContainer, NavLinkButton, StyledLinkGroup } from './Header.styles'

function Header() {
    return (
        <HeaderContainer>
            <Container>
                <HeaderNav>
                    <HeaderLogo>
                        <img src="/image/Wallet_logo.png" alt="Logo" />
                    </HeaderLogo>
                    <StyledLinkGroup>
                        <LinkContainer>
                            <NavLinkButton to={'/expenses'}>Мои расходы</NavLinkButton>
                        </LinkContainer>
                        <LinkContainer>
                            <NavLinkButton to={'/analysis'}>Анализ расходов</NavLinkButton>
                        </LinkContainer>
                    </StyledLinkGroup>

                    <LinkContainer>
                        <NavLinkButton to={'/logout'}>Выйти</NavLinkButton>
                    </LinkContainer>
                </HeaderNav>
            </Container>
        </HeaderContainer>
    )
}

export default Header
