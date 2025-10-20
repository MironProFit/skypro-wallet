import { useState } from 'react'
import { FormGroup, SectionTitle, FormBtn, FormInput, FormLabel, FormWrapper, FlexContainer } from '../../styles/GlobalStyled'

import {
    AddButton,
    CategoryButton,
    CategoryContainer,
    CategoryDesc,
    CategoryImg,
    CategoryWrap,
    ExpensesFormGroup,
    ExpensesSection,
    FormInputSum,
    FormInputSumWrapper,
    RubleIcon,
} from './Expenses.styles'
import { accentColor, secondaryColor, textColor } from '../../styles/Mexins.style'
import { categoryList } from '../../data/CategoryList'
import { useAppCoontext } from '../../contexts/AppContext'

function NewExpense({ $flex }) {
    const { isMobile } = useAppCoontext()
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

                    <CategoryWrap>
                        {categoryList.map((category) => {
                            const IconComponents = category.icon
                            return (
                                <CategoryButton>
                                    <CategoryContainer active $active={active ? 'rgba(115, 52, 234, 0.1)' : secondaryColor}>
                                        <CategoryImg>
                                            <IconComponents $active={active ? accentColor : textColor} />
                                        </CategoryImg>
                                        <CategoryDesc $active={active ? accentColor : textColor}>{category.name}</CategoryDesc>
                                    </CategoryContainer>
                                </CategoryButton>
                            )
                        })}
                    </CategoryWrap>
                </ExpensesFormGroup>

                <ExpensesFormGroup>
                    <FormLabel htmlFor="formDate">Дата</FormLabel>
                    <FormInput $isMobile={isMobile} $icon id="formDate" type="date" placeholder="Введите дату" />
                </ExpensesFormGroup>

                <ExpensesFormGroup>
                    <FormLabel htmlFor="formPrice">Сумма</FormLabel>
                    {/* Используем обёртку и новый инпут */}
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
