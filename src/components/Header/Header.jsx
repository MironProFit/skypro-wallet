import { Link } from 'react-router-dom'
import { StyledLink, Wrapper } from '../../styles/GlobalStyled'

import { HeaderContainer, HeaderLogo, HeaderNav, NavLinkButton, StyledLinkGroup } from './Header.styles'

function Header() {
    return (
            <HeaderContainer>
                <HeaderNav>
                    <HeaderLogo>
                        <img src="/image/Wallet_logo.png" alt="Logo" />
                    </HeaderLogo>
                    <StyledLinkGroup>
                        <NavLinkButton to={'/expenses'}>Мои расходы</NavLinkButton>
                        <NavLinkButton to={'/analysis'}>Анализ расходов</NavLinkButton>
                    </StyledLinkGroup>

                    <NavLinkButton to={'/logout'}>Выйти</NavLinkButton>
                </HeaderNav>
            </HeaderContainer>
    )
}

export default Header
