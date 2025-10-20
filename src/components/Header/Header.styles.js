import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { accentColor, accentColorRgb, primaryColor, secondaryColor, textColor } from '../../styles/Mexins.style'

export const HeaderContainer = styled.header`
    height: 64px;
    width: 100%;
    display: flex;
    background-color: ${primaryColor};
    padding: 20px 0;
    margin: 0 auto;

    ${({ $isMobile }) =>
        $isMobile &&
        css`
            background-color: ${secondaryColor};
        `}
`

export const HeaderLogo = styled(Link)`
    display: flex;
    align-items: center;
`

export const HeaderNav = styled.nav`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 15px;
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
        bottom: -3px;
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

    ${({ $isMobile }) =>
        $isMobile &&
        css`
            &::after {
                position: absolute;
                content: '';
                background-image: url('../../../public/image/icon/triangle-icon.png');
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                width: 19px;
                height: 19px;
            }

            color: ${accentColor};
            &::before {
                width: 100%;
            }
        `}

    ${({ $isMobile, $isModal }) =>
        $isMobile &&
        $isModal &&
        css`
            &::after {
                position: absolute;
                content: '';
                background-image: url('image/icon/triangle-icon.png');
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                width: 19px;
                height: 19px;
                transform: rotate(180deg) translateY(-10px);
            }
        `}
        @media (hover: hover) {
    }
`

export const LinkContainer = styled.div`
    position: relative;
`

export const ModalLinks = styled.div`
    gap: 6px;
    display: none;
    right: -40px;
    left: -50px;
    top: 30px;
    position: absolute;
    padding: 10px;
    background-color: ${primaryColor};
    flex-direction: column;
    z-index: 999;
    border-radius: 24px;
    border: 1px solid ${textColor};

    ${({ $isModal }) =>
        $isModal &&
        css`
            display: flex;
        `}
`

export const NavLinkModal = styled(Link)`
    cursor: pointer;
    padding: 7px 14px;
    border-radius: 24px;
    background-color: ${secondaryColor};
    ${({ $isLinkActive }) =>
        $isLinkActive &&
        css`
            background-color: ${accentColorRgb};
        `}
`
