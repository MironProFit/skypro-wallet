import { useEffect, useState } from 'react'
import { useAppCoontext } from '../../contexts/AppContext'
import { useAuthContext } from '../../contexts/AuthContext'
import { Container } from '../../styles/GlobalStyled'
import { useLocation, useNavigate } from 'react-router-dom' // useNavigate уже импортирован

import { HeaderContainer, HeaderLogo, HeaderNav, LinkContainer, ModalLinks, NavLinkButton, NavLinkModal, StyledLinkGroup } from './Header.styles'

function Header(onLogout) {
    const { isAuth } = useAuthContext()
    const { isMobile } = useAppCoontext()
    const [isModal, setIsmodal] = useState(false)
    const location = useLocation()
    const [linkName, setLinkName] = useState('Мои расходы') // Начальное значение
    const navigate = useNavigate()

    // useEffect для обновления linkName при изменении location.pathname
    useEffect(() => {
        let newName = 'Мои расходы'
        switch (location.pathname) {
            case '/expenses':
                newName = 'Мои расходы'
                break
            case '/expenses/new':
                newName = 'Новый расход'
                break
            case '/analysis':
                newName = 'Анализ расходов'
                break
            default:
                newName = 'Мои расходы'
        }
        setLinkName(newName)
    }, [location.pathname])

    const handleModalLinks = (e) => {
        e.preventDefault()
        setIsmodal((prev) => !prev)
    }

    const isLinkActive = (path) => {
        return location.pathname === path
    }

    return (
        <HeaderContainer $isMobile={isMobile}>
            <Container>
                <HeaderNav>
                    <HeaderLogo>
                        <img src="/image/Wallet_logo.png" alt="Logo" />
                    </HeaderLogo>
                    {isAuth && (
                        <>
                            {!isMobile ? (
                                <StyledLinkGroup>
                                    <LinkContainer>
                                        <NavLinkButton $isMobile={isMobile} to={'/expenses'}>
                                            Мои расходы
                                        </NavLinkButton>
                                    </LinkContainer>
                                    <LinkContainer>
                                        <NavLinkButton $isMobile={isMobile} to={'/analysis'}>
                                            Анализ расходов
                                        </NavLinkButton>
                                    </LinkContainer>
                                </StyledLinkGroup>
                            ) : (
                                <LinkContainer>
                                    <NavLinkButton $isModal={isModal} onClick={handleModalLinks} $isMobile={isMobile}>
                                        {linkName}
                                    </NavLinkButton>
                                    <ModalLinks $isModal={isModal}>
                                        {/* Используем to, state и onClick для закрытия модального окна */}
                                        <NavLinkModal to={'/expenses'} $isModal={isModal} $isMobile={isMobile} $isLinkActive={isLinkActive('/expenses')} onClick={() => setIsmodal(false)}>
                                            Мои расходы
                                        </NavLinkModal>
                                        <NavLinkModal
                                            to={'/expenses/new'}
                                            state={{ isModal: false }}
                                            $isModal={isModal}
                                            $isMobile={isMobile}
                                            $isLinkActive={isLinkActive('/expenses/new')}
                                            onClick={() => setIsmodal(false)}
                                        >
                                            Новый расход
                                        </NavLinkModal>
                                        <NavLinkModal
                                            to={'/analysis'}
                                            state={{ isModal: false }}
                                            $isModal={isModal}
                                            $isMobile={isMobile}
                                            $isLinkActive={isLinkActive('/analysis')}
                                            onClick={() => setIsmodal(false)}
                                        >
                                            Анализ расходов
                                        </NavLinkModal>
                                    </ModalLinks>
                                </LinkContainer>
                            )}

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
