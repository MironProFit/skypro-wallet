import styled, { css } from 'styled-components'
import { Container, FormGroup, FormInput, PageText, PrimaryButton, Section, SectionTitle } from '../../styles/GlobalStyled'
import { Link } from 'react-router-dom'
import { NavLinkButton } from '../Header/Header.styles'
import { accentColor, borderColor, errorColor, primaryColor, secondaryColor, successColor, textColor, warningColor } from '../../styles/Mexins.style'

export const AuthContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const AuthSection = styled(Section)`
    width: 379px;
    /* height: 334px; */
    ${({ $isMobile }) =>
        $isMobile &&
        css`
            width: unset;
        `}
`

export const ModalWrapper = styled.div`
    width: 100%;
    height: 100%;
    min-width: 320px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: ${({ $isMobile }) => ($isMobile ? primaryColor : secondaryColor)};
`

export const ModalOverlay = styled.div`
    position: fixed; /* фиксируем относительно окна браузера */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* полупрозрачный фон */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999; /* чтобы был поверх всего */
    pointer-events: auto; /* перехватывать клики */
`

export const ModalContent = styled(Section)``
export const ModalButtons = styled.div`
    display: flex;
    gap: 30px;
`

export const AuthTitle = styled(SectionTitle)`
    display: flex;
    justify-content: center;
`

export const AuthFormGroup = styled(FormGroup)`
    /* margin-bottom: 24px; */
`

export const TextInput = styled(FormInput)`
    width: 100%;
    margin-bottom: 12px;
    background: ${({ $hasError, $isEmpty }) => {
        if ($hasError) return warningColor
        if ($isEmpty === undefined || $isEmpty) return primaryColor
        return successColor
    }};
    color: ${textColor};

    &:focus {
        outline: none;
        border: 1px solid ${({ $hasError }) => ($hasError ? errorColor : accentColor)};
    }
`

export const PasswordInput = styled(FormInput)`
    transition: 0.3s;
    width: 100%;
    margin-bottom: 12px;
    background: ${({ $hasError, $isEmpty }) => {
        if ($hasError) return warningColor
        if ($isEmpty === undefined || $isEmpty) return primaryColor
        return successColor
    }};
    color: ${textColor};

    &:focus {
        outline: none;
        border: 1px solid ${({ $hasError }) => ($hasError ? errorColor : accentColor)};
    }
`
export const SubmitButton = styled(PrimaryButton)`
    margin-bottom: 24px;
`

export const InputGroup = styled.form`
    width: 313px;
`
export const PromtGroup = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`
export const PromtTitle = styled(PageText)`
    color: ${borderColor};
`

export const PromtText = styled(PageText)``
export const PromtLink = styled(NavLinkButton)`
    color: ${borderColor};

    &::before {
        width: 100%;
        bottom: 1px;
        border-bottom: 1px solid ${borderColor};
    }
    &:hover {
        color: ${accentColor};
    }
    &:hover::before {
        border-bottom: 1px solid ${accentColor};
    }
`
export const ErrorInfo = styled.div`
    min-height: 24px;
`
export const ErrorText = styled(PageText)`
    white-space: pre-wrap;
    font-family: 'Arial';
    color: #f84d4d;
`
