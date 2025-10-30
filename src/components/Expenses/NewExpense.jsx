import { useState } from 'react'
import { SectionTitle, FormBtn, FormInput, FormLabel, FormWrapper, FlexContainer } from '../../styles/GlobalStyled'

import { AddButton, ExpensesFormGroup, ExpensesSection, FormInputSum, FormInputSumWrapper, RubleIcon } from './Expenses.styles'
import { accentColor, secondaryColor, textColor } from '../../styles/Mexins.style'
import { categoryList } from '../../data/CategoryList'
import { useAppContext } from '../../contexts/AppContext'
import Catagory from '../Category/Catagory'

function NewExpense({ $flex }) {
    const { isMobile } = useAppContext()
    const [active, setActive] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)

    return (
        <ExpensesSection $isMobile={isMobile} $flex={$flex}>
            {!isMobile && <SectionTitle style={{ marginBottom: '32px' }}>Новый расход</SectionTitle>}

            <FormWrapper>
                <ExpensesFormGroup>
                    <FormLabel htmlFor="formDesc">Описание</FormLabel>
                    <FormInput $isMobile={isMobile} id="formDesc" type="text" placeholder="Введите что-то" />
                </ExpensesFormGroup>

                <ExpensesFormGroup>
                    <FormLabel>Категории</FormLabel>

                    <Catagory active={active} />

                </ExpensesFormGroup>

                <ExpensesFormGroup>
                    <FormLabel htmlFor="formDate">Дата</FormLabel>
                    <FormInput $isMobile={isMobile} $icon id="formDate" type="date" placeholder="Введите дату" />
                </ExpensesFormGroup>

                <ExpensesFormGroup>
                    <FormLabel htmlFor="formPrice">Сумма</FormLabel>
                    <FormInputSumWrapper>
                        <RubleIcon>₽</RubleIcon> {/* Компонент символа */}
                        <FormInputSum $isMobile={isMobile} id="formPrice" type="number" placeholder="Введите сумму" /> {/* Обновлённый инпут */}
                    </FormInputSumWrapper>
                </ExpensesFormGroup>

                {isMobile ? (
                    <FlexContainer>
                        <AddButton disabled={isDisabled}>Добавить новый расход</AddButton>
                    </FlexContainer>
                ) : (
                    <FormBtn>
                        <AddButton disabled={isDisabled}>Добавить новый расход</AddButton>
                    </FormBtn>
                )}
            </FormWrapper>
        </ExpensesSection>
    )
}

export default NewExpense
