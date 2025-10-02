import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { accentColor, primaryColor } from '../../styles/Mexins.style'

export const HeaderContainer = styled.header`
    height: 64px;
    width: 100%;
    display: flex;
    background-color: ${primaryColor};
    padding: 20px;
`

export const HeaderLogo = styled(Link)`
    display: flex;
    align-items: center;
`

export const HeaderNav = styled.nav`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
`

export const StyledLinkGroup = styled.div`
    gap: 48px;
    display: flex;
`

export const NavLinkButton = styled(Link)`
    position: relative;
    transition: 0.3s;
    &::before {
        transition: 0.3s;
        position: absolute;
        bottom: 1px;
        left: 50%;
        content: '';
        width: 0;
        border-bottom: 1px solid ${accentColor};
        transform: translateX(-50%);
    }
    &:hover {
        color: ${accentColor};
    }
    &:hover::before {
        width: 100%;
    }
`
