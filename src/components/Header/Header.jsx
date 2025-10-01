import { HeaderContainer, HeaderNav } from './Header.styles'

function Header() {
    return (
        <HeaderContainer>
            <HeaderNav>
                <HeaderLogo>
                    <StyledLink>
                        <img src="/public/Wallet_logo.png" alt="Logo" />
                    </StyledLink>
                </HeaderLogo>
                <StyledLink>Мои расходы</StyledLink>
                <StyledLink>Анализ расходов</StyledLink>
                <StyledLink>Выйти</StyledLink>
            </HeaderNav>
        </HeaderContainer>
    )
}

export default Header
