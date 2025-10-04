import { useLocation, useNavigate } from 'react-router-dom'
import {
    AuthContainer,
    AuthFormGroup,
    AuthSection,
    AuthTitle,
    ErrorInfo,
    ErrorText,
    InputGroup,
    ModalWrapper,
    PasswordInput,
    PromtGroup,
    PromtLink,
    PromtText,
    PromtTitle,
    SubmitButton,
    TextInput,
} from './AuthModal.styles'
import { useEffect, useState } from 'react'

function AuthModal() {
    const [isPage, setIsPage] = useState('login')
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.pathname === '/register') {
            setIsPage('register')
        } else {
            setIsPage('login')
        }
    }, [])

    return (
        <ModalWrapper>
            <AuthContainer>
                <AuthSection>
                    <AuthFormGroup>
                        <AuthTitle>{isPage === 'login' ? 'Вход' : 'Регистрация'}</AuthTitle>
                        <InputGroup>
                            {isPage === 'login' ? (
                                <>
                                    <TextInput placeholder="Эл. почта" type="text" id="login" />

                                    <PasswordInput placeholder="Пароль" type="password" id="password" />
                                </>
                            ) : (
                                <>
                                    <TextInput placeholder="Имя" type="name" id="name" />

                                    <TextInput placeholder="Эл. почта" type="email" id="email" />

                                    <PasswordInput placeholder="Пароль" type="password" id="password" />
                                </>
                            )}
                        </InputGroup>
                        <ErrorInfo>
                            <ErrorText>Упс! Введенные вами данные некорректны. Введите данные корректно и повторите попытку.</ErrorText>
                        </ErrorInfo>
                        <SubmitButton>Войти</SubmitButton>
                        <PromtGroup>
                            {isPage === 'login' ? (
                                <>
                                    <PromtTitle>Нужно зарегистрироваться?</PromtTitle>
                                    <PromtLink
                                        to="/register"
                                        type="button"
                                        onClick={() => {
                                            setIsPage('register')
                                        }}
                                    >
                                        <PromtText>Регистрируйтесь здесь</PromtText>
                                    </PromtLink>
                                </>
                            ) : (
                                <>
                                    <PromtTitle>Уже есть аккаунт?</PromtTitle>
                                    <PromtLink
                                        to="/login"
                                        type="button"
                                        onClick={() => {
                                            setIsPage('login')
                                        }}
                                    >
                                        <PromtText>Войдите здесь</PromtText>
                                    </PromtLink>
                                </>
                            )}
                        </PromtGroup>
                    </AuthFormGroup>
                </AuthSection>
            </AuthContainer>
        </ModalWrapper>
    )
}

export default AuthModal
