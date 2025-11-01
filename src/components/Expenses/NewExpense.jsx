import { useEffect, useState } from 'react'
import { SectionTitle, FormBtn, FormInput, FormLabel, FormWrapper, FlexContainer } from '../../styles/GlobalStyled'

import { AddButton, ExpensesFormGroup, ExpensesSection, FormInputSum, FormInputSumWrapper, RubleIcon } from './Expenses.styles'
import { accentColor, secondaryColor, textColor } from '../../styles/Mexins.style'
import { categoryList } from '../../data/CategoryList'
import { useAppContext } from '../../contexts/AppContext'
import Catagory from '../Category/Catagory'
import { useFetch } from '../../hooks/useFetch'
import { useAuthContext } from '../../contexts/AuthContext'
import { formattedDateForApi } from '../../utils/date-fns'
import { ErrorInfo, ErrorText } from '../Auth/AuthModal.styles'

function NewExpense({ $flex }) {
    const { isMobile } = useAppContext()
    const { setToastNotification, token, userData, setUserData } = useAuthContext()
    const { fetchData, loading, error } = useFetch()
    const [isDisabled, setIsDisabled] = useState(true)
    const [expenses, setExpenses] = useState({ description: '', sum: '', category: '', date: '' })
    const [isDescriptionTouched, setIsDescriptionTouched] = useState(false)

    useEffect(() => {
        const allFieldsFilled = expenses.description.length >= 3 && expenses.sum > 0 && expenses.category !== '' && expenses.date !== ''
        setIsDisabled(!allFieldsFilled)
    }, [expenses])

    const onDescription = (value) => {
        !isDescriptionTouched && setIsDescriptionTouched(true)
        setExpenses((prev) => ({ ...prev, description: value }))
    }
    const onCategory = (e) => {
        setExpenses((prev) => ({ ...prev, category: e }))
    }
    const onDate = (e) => {
        const newDate = formattedDateForApi(e)
        setExpenses((prev) => ({ ...prev, date: newDate }))
    }
    const onSum = (e) => {
        const value = e.trim() === '' ? 0 : Number(e)
        setExpenses((prev) => ({ ...prev, sum: value }))
    }

    const onSubmitForm = async () => {
        try {
            const response = await fetchData({ url: 'transactions', data: expenses, method: 'post', token: token })
            if (response) {
                setIsDescriptionTouched(false)
                setExpenses({ description: '', sum: '', category: '', date: '' })

                const transactionsResponse = await fetchData({ url: 'transactions', token })
                setUserData(transactionsResponse)
            }
        } catch (error) {
            setToastNotification(error)
            console.log(error)

            // Обработка ошибок
            console.error('Ошибка при отправке:', error)
        }
    }

    return (
        <ExpensesSection $isMobile={isMobile} $flex={$flex}>
            {!isMobile && <SectionTitle style={{ marginBottom: '32px' }}>Новый расход</SectionTitle>}

            <FormWrapper
                onSubmit={(e) => {
                    e.preventDefault()
                    onSubmitForm(e)
                }}
            >
                <ExpensesFormGroup>
                    <FormLabel htmlFor="formDesc">Описание</FormLabel>
                    <FormInput $isMobile={isMobile} id="formDesc" type="text" value={expenses.description} placeholder="Введите что-то" onChange={(e) => onDescription(e.target.value)} />

                    {isDescriptionTouched && expenses.description.length <= 3 && <ErrorText>Минимум 4 символа.</ErrorText>}
                </ExpensesFormGroup>

                <ExpensesFormGroup>
                    <FormLabel>Категории</FormLabel>

                    <Catagory expenses={expenses} onCategory={onCategory} />
                </ExpensesFormGroup>

                <ExpensesFormGroup>
                    <FormLabel htmlFor="formDate">Дата</FormLabel>
                    <FormInput
                        $isMobile={isMobile}
                        $icon
                        id="formDate"
                        type="date"
                        value={expenses.date}
                        placeholder="Введите дату"
                        onChange={(e) => {
                            onDate(e.target.value)
                        }}
                    />
                </ExpensesFormGroup>

                <ExpensesFormGroup>
                    <FormLabel htmlFor="formPrice">Сумма</FormLabel>
                    <FormInputSumWrapper>
                        <RubleIcon>₽</RubleIcon> {/* Компонент символа */}
                        <FormInputSum
                            $isMobile={isMobile}
                            id="formPrice"
                            type="number"
                            placeholder="Введите сумму"
                            value={expenses.sum}
                            onChange={(e) => {
                                onSum(e.target.value)
                            }}
                        />
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
                        <AddButton
                            type="submit"
                            // onSubmit={(e) => {
                            //     onSubmitForm(e.target.value)
                            // }}
                            disabled={isDisabled}
                        >
                            Добавить новый расход
                        </AddButton>
                    </FormBtn>
                )}
            </FormWrapper>
        </ExpensesSection>
    )
}

export default NewExpense
