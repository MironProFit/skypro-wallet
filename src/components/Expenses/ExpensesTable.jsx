import { useState } from 'react'
import { SectionTitle } from '../../styles/GlobalStyled'
import CartSVG from '../SvgIcons/CategoryIcons/CartSVG'

import { ExpensesHeader, ExpensesItem, ExpensesList, ExpensesSection, HeaderCell, ItemCell, ItemCellImg } from './Expenses.styles'

function ExpensesTable({ $flex }) {
    console.log($flex)
    const [color, setColor] = useState(true)
    return (
        <>
            <ExpensesSection $flex={$flex}>
                <SectionTitle>Таблица расходов</SectionTitle>

                <ExpensesHeader>
                    <HeaderCell>Описание</HeaderCell>
                    <HeaderCell>Категория</HeaderCell>
                    <HeaderCell>Дата</HeaderCell>
                    <HeaderCell>Сумма</HeaderCell>
                    <HeaderCell></HeaderCell>
                </ExpensesHeader>

                <ExpensesList>
                    <ExpensesItem>
                        <ItemCell>Магазин</ItemCell>
                        <ItemCell>Продукты</ItemCell>
                        <ItemCell>02.10.2025</ItemCell>
                        <ItemCell>1500 &#8381;</ItemCell>
                        <ItemCellImg>
                            <CartSVG $color={'green'} />
                        </ItemCellImg>
                    </ExpensesItem>
                </ExpensesList>
            </ExpensesSection>
        </>
    )
}

export default ExpensesTable
