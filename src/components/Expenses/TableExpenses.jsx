import { useEffect, useState } from 'react'
import { FlexContainer, PrimaryButton, Section, SectionTitle } from '../../styles/GlobalStyled'
import CartSVG from '../icons/CategoryIcons/CartSVG'

import { ExpensesHeader, ExpensesItem, ExpensesList, ExpensesSection, HeaderCell, ItemCell, ItemCellImg } from './Expenses.styles'
import { useAppCoontext } from '../../contexts/AppContext'

function ExpensesTable({ $flex }) {
    const { isMobile } = useAppCoontext()
    const [color, setColor] = useState(true)
    const [isVisible, setIsVisible] = useState()

    useEffect(() => {
        setIsVisible(isMobile ? true : false)
    }, [isMobile])
    return (
        <>
            <ExpensesSection $isMobile={isMobile} $flex={$flex}>
                <SectionTitle>Таблица расходов</SectionTitle>

                <ExpensesHeader $isMobile={isMobile}>
                    <HeaderCell $isMobile={isMobile} $isVisible={isVisible}>
                        Описание
                    </HeaderCell>
                    <HeaderCell $isMobile={isMobile} $isVisible={isVisible}>
                        Категория
                    </HeaderCell>
                    <HeaderCell $isMobile={isMobile} $isVisible={isVisible}>
                        Дата
                    </HeaderCell>
                    <HeaderCell $isMobile={isMobile} $isVisible={isVisible}>
                        Сумма
                    </HeaderCell>
                    <HeaderCell $isMobile={isMobile} $isVisible={isVisible}></HeaderCell>
                </ExpensesHeader>

                <ExpensesList>
                    <ExpensesItem $isMobile={isMobile}>
                        <ItemCell $isVisible={isVisible}>Магазин</ItemCell>
                        <ItemCell $isVisible={isVisible}>Продукты</ItemCell>
                        <ItemCell $isVisible={isVisible}>02.10.2025</ItemCell>
                        <ItemCell $isVisible={isVisible}>1500 &#8381;</ItemCell>
                        <ItemCellImg $isVisible={isVisible} $isMobile={isMobile}>
                            <CartSVG />
                        </ItemCellImg>
                    </ExpensesItem>

                    <ExpensesItem $isMobile={isMobile}>
                        <ItemCell $isVisible={isVisible}>Магазин</ItemCell>
                        <ItemCell $isVisible={isVisible}>Продукты</ItemCell>
                        <ItemCell $isVisible={isVisible}>02.10.2025</ItemCell>
                        <ItemCell $isVisible={isVisible}>1500 &#8381;</ItemCell>
                        <ItemCellImg $isVisible={isVisible} $isMobile={isMobile}>
                            <CartSVG />
                        </ItemCellImg>
                    </ExpensesItem>
                </ExpensesList>

                {isMobile && (
                    <FlexContainer>
                        <PrimaryButton>Удалить расход</PrimaryButton>
                    </FlexContainer>
                )}
            </ExpensesSection>
        </>
    )
}

export default ExpensesTable
