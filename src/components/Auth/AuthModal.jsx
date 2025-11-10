import { useLocation, useNavigate } from 'react-router-dom'

import { useForm } from 'react-hook-form'

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
import { useAppContext } from '../../contexts/AppContext'
import { useAuthContext } from '../../contexts/AuthContext'
import { useFetch } from '../../hooks/useFetch'

function AuthModal() {
    const [isPage, setIsPage] = useState('login')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })
    const { fetchData } = useFetch()
    const location = useLocation()
    const navigate = useNavigate()
    const { isMobile, setIsLoading } = useAppContext()
    const { setUserData, token, setToken } = useAuthContext()

    // Настройка форм
    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        watch: watchLogin,
        reset: resetLogin,
        formState: { errors: errorsLogin, isValid: isValidLogin },
    } = useForm({ mode: 'onChange' })

    const {
        register: registerSignUp,
        handleSubmit: handleSubmitSignUp,
        reset: resetSignUp,
        watch: watchSignUp,
        formState: { errors: errorsSignUp, isValid: isValidSignUp },
    } = useForm({ mode: 'onChange' })

    const loginEmail = watchLogin('email')
    const loginPassword = watchLogin('password')

    const signUpName = watchSignUp('name')
    const signUpEmail = watchSignUp('email')
    const signUpPassword = watchSignUp('password')

    useEffect(() => {
        if (location.pathname === '/register') {
            setIsPage('register')
            resetLogin()
        } else {
            setIsPage('login')
            resetSignUp()
        }
    }, [location.pathname, resetLogin, resetSignUp])

    useEffect(() => {
        setIsLoading(false)
    }, [])

    const onSubmit = async (data) => {
        // setIsLoading(true)
        try {
            const urlAuth = isPage === 'login' ? 'user/login' : 'user'

            const response = await fetchData({ url: urlAuth, data })

            const newToken = response.user?.token

            if (newToken || token) {
                setToken(response.user?.token)
                navigate('/expenses')
                const urlData = newToken ? 'transactions' : null
                const transactionsResponse = await fetchData({ url: urlData, data, newToken: newToken })

                setUserData(transactionsResponse)
            }
        } catch (err) {
            setToastNotification(err)

            // Обработка ошибок
            console.error('Ошибка при отправке:', err)
        // setIsLoading(false)

        }
    }

    return (
        <ModalWrapper $isMobile={isMobile}>
            {!token && (
                <AuthContainer>
                    <AuthSection $isMobile={isMobile}>
                        <AuthFormGroup>
                            <AuthTitle>{isPage === 'login' ? 'Вход' : 'Регистрация'}</AuthTitle>
                            {isPage === 'login' ? (
                                <>
                                    <InputGroup onSubmit={handleSubmitLogin(onSubmit)}>
                                        <TextInput
                                            $hasError={!!errorsLogin.email}
                                            $isEmpty={!loginEmail}
                                            placeholder="Эл. почта"
                                            type="email"
                                            id="email"
                                            autoComplete="username"
                                            {...registerLogin('email', { required: 'Поле обязательно.', minLength: { value: 4, message: 'Минимум 4 символа.' } })}
                                        />
                                        {errorsLogin.email && (
                                            <ErrorInfo>
                                                <ErrorText>{errorsLogin.email?.message}</ErrorText>
                                            </ErrorInfo>
                                        )}

                                        <PasswordInput
                                            $hasError={!!errorsLogin.password}
                                            $isEmpty={!loginPassword}
                                            placeholder="Пароль"
                                            type="password"
                                            id="password"
                                            {...registerLogin('password', { required: 'Поле обязательно.', minLength: { value: 8, message: 'Минимум 8 символа.' } })}
                                        />

                                        {errorsLogin.password && (
                                            <ErrorInfo>
                                                <ErrorText>{errorsLogin.password?.message}</ErrorText>
                                            </ErrorInfo>
                                        )}

                                        <SubmitButton type="submit" disabled={!isValidLogin}>
                                            Войти
                                        </SubmitButton>
                                    </InputGroup>
                                </>
                            ) : (
                                <>
                                    <InputGroup onSubmit={handleSubmitSignUp(onSubmit)}>
                                        <TextInput
                                            $hasError={!!errorsSignUp.name}
                                            $isEmpty={!signUpName}
                                            placeholder="Имя"
                                            type="text"
                                            id="name"
                                            {...registerSignUp('name', { required: 'Поле обязательно.', minLength: { value: 4, message: 'Минимум 4 символа.' } })}
                                        />
                                        {errorsSignUp.name && (
                                            <ErrorInfo>
                                                <ErrorText>{errorsSignUp.name?.message}</ErrorText>
                                            </ErrorInfo>
                                        )}
                                        <TextInput
                                            $hasError={!!errorsSignUp.email}
                                            $isEmpty={!signUpEmail}
                                            placeholder="Эл. почта"
                                            type="email"
                                            id="email"
                                            {...registerSignUp('email', { required: 'Поле обязательно.', minLength: { value: 6, message: 'Минимум 6 символа.' } })}
                                        />
                                        {errorsSignUp.email && (
                                            <ErrorInfo>
                                                <ErrorText>{errorsSignUp.email?.message}</ErrorText>
                                            </ErrorInfo>
                                        )}
                                        <PasswordInput
                                            $hasError={!!errorsSignUp.password}
                                            $isEmpty={!signUpPassword}
                                            placeholder="Пароль"
                                            type="password"
                                            id="password"
                                            {...registerSignUp('password', { required: 'Поле обязательно.', minLength: { value: 8, message: 'Минимум 8 символа.' } })}
                                        />

                                        {errorsSignUp.password && (
                                            <ErrorInfo>
                                                <ErrorText>{errorsSignUp.password?.message}</ErrorText>
                                            </ErrorInfo>
                                        )}
                                        <SubmitButton type="submit" disabled={!isValidSignUp}>
                                            Регистрация
                                        </SubmitButton>
                                    </InputGroup>
                                </>
                            )}

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
            )}
        </ModalWrapper>
    )
}

export default AuthModal
