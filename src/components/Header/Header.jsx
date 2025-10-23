import { useEffect, useState } from 'react'
import { useAppContext } from '../../contexts/AppContext'
import { useAuthContext } from '../../contexts/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom' // useNavigate уже импортирован
import { HeaderContainer, HeaderLogo, HeaderNav, HeaderWrapper, LinkContainer, ModalLinks, NavLinkButton, NavLinkModal, StyledLinkGroup } from './Header.styles'

import logoDark from '../../assets/image/logo/logo-dark.svg'

function Header(onLogout) {
    const { isAuth } = useAuthContext()
    const { isMobile } = useAppContext()
    const [isModal, setIsModal] = useState(false)
    const location = useLocation()
    const [linkName, setLinkName] = useState('Мои расходы') // Начальное значение
    const navigate = useNavigate()

    // useEffect для обновления linkName при изменении location.pathname
    useEffect(() => {
        const pathMap = { '/expenses': 'Мои расходы', '/expenses/new': 'Новый расход', '/analysis': 'Анализ расходов', '/analysis/period': 'Анализ расходов' }
        setLinkName(pathMap[location.pathname] || 'Мои расходы')
    }, [location.pathname])

    const handleModalLinks = (e) => {
        e.preventDefault()
        setIsModal((prev) => !prev)
    }

    const isLinkActive = (path) => {
        return location.pathname === path
    }

    return (
        <HeaderWrapper $isMobile={isMobile}>
            <HeaderContainer $isMobile={isMobile}>
                <HeaderNav $isMobile={isMobile}>
                    <HeaderLogo>
                        <img src={logoDark} alt="Logo" />
                    </HeaderLogo>
                    {isAuth && (
                        <>
                            {!isMobile ? (
                                <StyledLinkGroup>
                                    <LinkContainer>
                                        <NavLinkButton $isMobile={isMobile} to={'/expenses'} $isLinkActive={isLinkActive('/expenses')}>
                                            Мои расходы
                                        </NavLinkButton>
                                    </LinkContainer>
                                    <LinkContainer>
                                        <NavLinkButton $isMobile={isMobile} to={'/analysis'} $isLinkActive={isLinkActive('/analysis')}>
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
                                        <NavLinkModal to={'/expenses'} $isModal={isModal} $isMobile={isMobile} $isLinkActive={isLinkActive('/expenses')} onClick={() => setIsmodal(false)}>
                                            Мои расходы
                                        </NavLinkModal>
                                        <NavLinkModal
                                            to={'/expenses/new'}
                                            state={{ isModal: false }}
                                            $isModal={isModal}
                                            $isMobile={isMobile}
                                            $isLinkActive={isLinkActive('/expenses/new')}
                                            onClick={() => setIsModal(false)}
                                        >
                                            Новый расход
                                        </NavLinkModal>
                                        <NavLinkModal
                                            to={'/analysis'}
                                            state={{ isModal: false }}
                                            $isModal={isModal}
                                            $isMobile={isMobile}
                                            $isLinkActive={isLinkActive('/analysis') || isLinkActive('/analysis/period')}
                                            onClick={() => setIsModal(false)}
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
            </HeaderContainer>
        </HeaderWrapper>
    )
}

export default Header
