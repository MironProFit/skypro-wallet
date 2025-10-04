import { useState } from 'react'
import { FormGroup, SectionTitle, FormBtn, FormInput, FormLabel, FormWrapper } from '../../styles/GlobalStyled'
import CartSVG from '../SvgIcons/CategoryIcons/CartSVG'
import HousingSVG from '../SvgIcons/CategoryIcons/HousingSVG'
import TransportSVG from '../SvgIcons/CategoryIcons/TransportSVG'
import { AddButton, CategoryButton, CategoryContainer, CategoryDesc, CategoryImg, CategoryWrap, ExpensesSection } from './Expenses.styles'
import { accentColor, secondaryColor, textColor } from '../../styles/Mexins.style'

function NewExpense({ $flex }) {
    const [active, setActive] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    return (
        <ExpensesSection $flex={$flex}>
            <SectionTitle style={{ marginBottom: '32px' }}>Новый расход</SectionTitle>

            <FormWrapper>
                <FormGroup>
                    <FormLabel htmlFor="formDesc">Описание</FormLabel>
                    <FormInput id="formDesc" type="text" placeholder="Введите что-то" />
                </FormGroup>

                <FormGroup>
                    <FormLabel>Категории</FormLabel>
                    <CategoryWrap>
                        <CategoryButton>
                            <CategoryContainer active $active={active ? 'rgba(115, 52, 234, 0.1)' : secondaryColor}>
                                <CategoryImg>
                                    <CartSVG $active={active ? accentColor : textColor} />
                                </CategoryImg>
                                <CategoryDesc $active={active ? accentColor : textColor}>Еда</CategoryDesc>
                            </CategoryContainer>
                        </CategoryButton>

                        <CategoryButton>
                            <CategoryContainer $active={active ? 'rgba(115, 52, 234, 0.1)' : secondaryColor}>
                                <CategoryImg>
                                    <TransportSVG $active={active ? accentColor : textColor} />
                                </CategoryImg>
                                <CategoryDesc $active={active ? accentColor : textColor}>Транспорт</CategoryDesc>
                            </CategoryContainer>
                        </CategoryButton>

                        <CategoryButton>
                            <CategoryContainer active $active={active ? 'rgba(115, 52, 234, 0.1)' : secondaryColor}>
                                <CategoryImg>
                                    <HousingSVG $active={active ? accentColor : textColor} />
                                </CategoryImg>
                                <CategoryDesc $active={active ? accentColor : textColor}>Жилье</CategoryDesc>
                            </CategoryContainer>
                        </CategoryButton>
                    </CategoryWrap>
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="formDate">Дата</FormLabel>
                    <FormInput id="formDate" type="date" placeholder="Введите дату" />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="formPrice">Сумма</FormLabel>
                    <FormInput $before id="formPrice" type="number" placeholder="Введите сумму" />
                </FormGroup>
                <FormBtn>
                    <AddButton disabled={isDisabled}>Добавить новый расход</AddButton>
                </FormBtn>
            </FormWrapper>
        </ExpensesSection>
    )
}

export default NewExpense
