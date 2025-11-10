// components/NewExpense/NewExpense.jsx
import { useEffect, useState, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { SectionTitle, FormBtn, FormInput, FormLabel, FormWrapper, FlexContainer } from '../../styles/GlobalStyled'
import { AddButton, ExpensesFormGroup, ExpensesSection, FormInputSum, FormInputSumWrapper, RubleIcon } from './Expenses.styles'
import { categoryList } from '../../data/CategoryList'
import { useAppContext } from '../../contexts/AppContext'
import Category from '../Category/Category'
import { useFetch } from '../../hooks/useFetch'
import { useAuthContext } from '../../contexts/AuthContext'
import { ErrorText } from '../Auth/AuthModal.styles'

function NewExpense({ $flex }) {
    const location = useLocation() // ✅ Получаем location
    const { isMobile, setToastNotification, isEditMode, setIsEditMode } = useAppContext()
    const { token, setUserData, userData } = useAuthContext()
    const { fetchData } = useFetch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        description: '',
        sum: '',
        category: '',
        date: '',
    })

    const [isDescriptionTouched, setIsDescriptionTouched] = useState(false)

    // === Определяем ID расхода из URL или из state ===
    const expenseIdFromState = location.state?.id || isEditMode || null
    const currentExpenseId = expenseIdFromState

    // === Сохраняем оригинальные данные для сравнения (опционально) ===
    const originalData = useMemo(() => {
        if (!currentExpenseId) return null
        const transaction = userData.find((item) => item._id === currentExpenseId)
        return transaction
            ? {
                  description: transaction.description,
                  sum: transaction.sum,
                  category: transaction.category,
                  date: transaction.date.split('T')[0],
              }
            : null
    }, [currentExpenseId, userData])

    // === Проверяем, были ли изменения (опционально) ===
    const hasChanges = useMemo(() => {
        if (!originalData) return true // при создании — всегда "есть изменения"
        return formData.description !== originalData.description || formData.sum !== originalData.sum || formData.category !== originalData.category || formData.date !== originalData.date
    }, [formData, originalData])

    // === Загрузка данных при редактировании ===
    useEffect(() => {
        if (currentExpenseId) {
            const transaction = userData.find((item) => item._id === currentExpenseId)
            if (transaction) {
                setFormData({
                    description: transaction.description,
                    sum: transaction.sum,
                    category: transaction.category,
                    date: transaction.date.split('T')[0],
                })
                setIsDescriptionTouched(false)
            }
        } else {
            setFormData({ description: '', sum: '', category: '', date: '' })
            setIsDescriptionTouched(false)
        }
    }, [currentExpenseId, userData])

    // === Валидность формы ===
    const isFormValid = formData.description.length >= 3 && formData.sum > 0 && formData.category !== '' && formData.date !== ''

    // === Обработчики ===
    const handleDescription = (value) => {
        if (!isDescriptionTouched) setIsDescriptionTouched(true)
        setFormData((prev) => ({ ...prev, description: value }))
    }

    const handleCategory = (category) => {
        setFormData((prev) => ({ ...prev, category }))
    }

    const handleDate = (value) => {
        setFormData((prev) => ({ ...prev, date: value }))
    }

    const handleSum = (value) => {
        const numValue = value.trim() === '' ? 0 : Number(value)
        setFormData((prev) => ({ ...prev, sum: numValue }))
    }

    // === Отправка формы ===
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let response

            if (currentExpenseId) {
                // === РЕДАКТИРОВАНИЕ ===
                response = await fetchData({
                    url: `transactions/${currentExpenseId}`,
                    method: 'patch',
                    data: formData, // ✅ formData передаётся как data
                    token,
                })

                if (response && response.transactions) {
                    setUserData(response.transactions)
                } else {
                    // Если сервер не вернул весь список — обновим вручную
                    const updatedData = await fetchData({ url: 'transactions', token })
                    setUserData(updatedData.transactions)
                }

                // ✅ ВСЕГДА возвращаемся на /expenses после редактирования
                setIsEditMode(null)
                navigate('/expenses')
            } else {
                // === СОЗДАНИЕ ===
                response = await fetchData({
                    url: 'transactions',
                    method: 'post',
                    data: formData, // ✅ formData передаётся как data
                    token,
                })

                if (response && response.transactions) {
                    setUserData(response.transactions)
                    // window.location.href = '/expenses'
                    navigate('/expenses')
                }
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Ошибка'
            setToastNotification(errorMessage)
            console.error('Ошибка:', error)
        }
    }
    useEffect(() => {
        console.log(location.pathname)
    }, [location.pathname])

    return (
        <ExpensesSection $isMobile={isMobile} $flex={$flex}>
            {!isMobile && <SectionTitle style={{ marginBottom: '32px' }}>{currentExpenseId ? 'Редактирование расхода' : 'Новый расход'}</SectionTitle>}

            <FormWrapper onSubmit={handleSubmit}>
                <ExpensesFormGroup>
                    <FormLabel htmlFor="formDesc">Описание</FormLabel>
                    <FormInput $isMobile={isMobile} id="formDesc" type="text" value={formData.description} placeholder="Введите что-то" onChange={(e) => handleDescription(e.target.value)} />
                    {isDescriptionTouched && formData.description.length < 4 && <ErrorText>Минимум 4 символа.</ErrorText>}
                </ExpensesFormGroup>

                <ExpensesFormGroup>
                    <FormLabel>Категория</FormLabel>
                    <Category mode="single" selectedCategory={formData.category} onCategory={handleCategory} />
                </ExpensesFormGroup>

                <ExpensesFormGroup>
                    <FormLabel htmlFor="formDate">Дата</FormLabel>
                    <FormInput $isMobile={isMobile} $icon id="formDate" type="date" value={formData.date} onChange={(e) => handleDate(e.target.value)} />
                </ExpensesFormGroup>

                <ExpensesFormGroup>
                    <FormLabel htmlFor="formPrice">Сумма</FormLabel>
                    <FormInputSumWrapper>
                        <RubleIcon>₽</RubleIcon>
                        <FormInputSum $isMobile={isMobile} id="formPrice" type="number" placeholder="Введите сумму" value={formData.sum || ''} onChange={(e) => handleSum(e.target.value)} />
                    </FormInputSumWrapper>
                </ExpensesFormGroup>

                {isMobile ? (
                    <FlexContainer>
                        <AddButton type="submit" disabled={!isFormValid || (currentExpenseId && !hasChanges)}>
                            {currentExpenseId ? 'Сохранить изменения' : 'Добавить расход'}
                        </AddButton>
                    </FlexContainer>
                ) : (
                    <FormBtn>
                        <AddButton type="submit" disabled={!isFormValid || (currentExpenseId && !hasChanges)}>
                            {currentExpenseId ? 'Сохранить изменения' : 'Добавить расход'}
                        </AddButton>
                    </FormBtn>
                )}
            </FormWrapper>
        </ExpensesSection>
    )
}

export default NewExpense
