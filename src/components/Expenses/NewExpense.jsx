import { useEffect, useState } from 'react'
import { SectionTitle, FormBtn, FormInput, FormLabel, FormWrapper, FlexContainer } from '../../styles/GlobalStyled'
import { AddButton, ExpensesFormGroup, ExpensesSection, FormInputSum, FormInputSumWrapper, RubleIcon } from './Expenses.styles'
import { categoryList } from '../../data/CategoryList'
import { useAppContext } from '../../contexts/AppContext'
import Category from '../Category/Category' // ← исправил опечатку в имени
import { useFetch } from '../../hooks/useFetch'
import { useAuthContext } from '../../contexts/AuthContext'
import { formattedDateForApi } from '../../utils/date-fns'
import { ErrorText } from '../Auth/AuthModal.styles'

function NewExpense({ $flex }) {
    const { isMobile } = useAppContext()
    const { setToastNotification, token, setUserData } = useAuthContext()
    const { fetchData } = useFetch()
    const [isDisabled, setIsDisabled] = useState(true)
    const [expenses, setExpenses] = useState({
        description: '',
        sum: '',
        category: '',
        date: '',
    })
    const [isDescriptionTouched, setIsDescriptionTouched] = useState(false)

    useEffect(() => {
        const allFieldsFilled = expenses.description.length >= 3 && expenses.sum > 0 && expenses.category !== '' && expenses.date !== ''
        setIsDisabled(!allFieldsFilled)
    }, [expenses])

    const onDescription = (value) => {
        if (!isDescriptionTouched) setIsDescriptionTouched(true)
        setExpenses((prev) => ({ ...prev, description: value }))
    }

    const onCategory = (category) => {
        setExpenses((prev) => ({ ...prev, category }))
    }

    const onDate = (value) => {
        const newDate = formattedDateForApi(value)
        setExpenses((prev) => ({ ...prev, date: newDate }))
    }

    const onSum = (value) => {
        const numValue = value.trim() === '' ? 0 : Number(value)
        setExpenses((prev) => ({ ...prev, sum: numValue }))
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const response = await fetchData({
                url: 'transactions',
                data: expenses,
                method: 'post',
                token,
            })
            if (response) {
                setExpenses({ description: '', sum: '', category: '', date: '' })
                setIsDescriptionTouched(false)

                const transactionsResponse = await fetchData({ url: 'transactions', token })
                setUserData(transactionsResponse)
            }
        } catch (error) {
            setToastNotification(error)
            console.error('Ошибка при отправке:', error)
        }
    }

    return (
        <ExpensesSection $isMobile={isMobile} $flex={$flex}>
            {!isMobile && <SectionTitle style={{ marginBottom: '32px' }}>Новый расход</SectionTitle>}

            <FormWrapper onSubmit={onSubmitForm}>
                <ExpensesFormGroup>
                    <FormLabel htmlFor="formDesc">Описание</FormLabel>
                    <FormInput $isMobile={isMobile} id="formDesc" type="text" value={expenses.description} placeholder="Введите что-то" onChange={(e) => onDescription(e.target.value)} />
                    {isDescriptionTouched && expenses.description.length < 4 && <ErrorText>Минимум 4 символа.</ErrorText>}
                </ExpensesFormGroup>

                <ExpensesFormGroup>
                    <FormLabel>Категория</FormLabel>
                    {/* ✅ Передаём selectedCategory для single-режима */}
                    <Category mode="single" selectedCategory={expenses.category} onCategory={onCategory} />
                </ExpensesFormGroup>

                <ExpensesFormGroup>
                    <FormLabel htmlFor="formDate">Дата</FormLabel>
                    <FormInput $isMobile={isMobile} $icon id="formDate" type="date" value={expenses.date} onChange={(e) => onDate(e.target.value)} />
                </ExpensesFormGroup>

                <ExpensesFormGroup>
                    <FormLabel htmlFor="formPrice">Сумма</FormLabel>
                    <FormInputSumWrapper>
                        <RubleIcon>₽</RubleIcon>
                        <FormInputSum $isMobile={isMobile} id="formPrice" type="number" placeholder="Введите сумму" value={expenses.sum || ''} onChange={(e) => onSum(e.target.value)} />
                    </FormInputSumWrapper>
                </ExpensesFormGroup>

                {isMobile ? (
                    <FlexContainer>
                        <AddButton type="submit" disabled={isDisabled}>
                            Добавить новый расход
                        </AddButton>
                    </FlexContainer>
                ) : (
                    <FormBtn>
                        <AddButton type="submit" disabled={isDisabled}>
                            Добавить новый расход
                        </AddButton>
                    </FormBtn>
                )}
            </FormWrapper>
        </ExpensesSection>
    )
}

export default NewExpense
