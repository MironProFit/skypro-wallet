import { useEffect, useState } from 'react'
import { FlexContainer, PrimaryButton, Section, SectionTitle } from '../../styles/GlobalStyled'
import CartSVG from '../icons/CategoryIcons/CartSVG'

import { ExpensesHeader, ExpensesItem, ExpensesList, ExpensesSection, HeaderCell, ItemCell, ItemCellImg } from './Expenses.styles'
import { useAuthContext } from '../../contexts/AuthContext'
import { formattedDate } from '../../utils/date-fns'
import { categoryList } from '../../data/CategoryList'
import { formatNum } from '../../utils/formatNum'

function ExpensesTable({ $flex }) {
    const { isMobile, userData } = useAuthContext()
    const [color, setColor] = useState(true)
    const [isVisible, setIsVisible] = useState()
    const [isHidden, setIsHidden] = useState(true)

    useEffect(() => {
        setIsVisible(isMobile ? true : false)
    }, [isMobile])
    return (
        <>
            <ExpensesSection $isMobile={isMobile} $flex={$flex}>
                {!isMobile && <SectionTitle>Таблица расходов</SectionTitle>}

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
                    <HeaderCell $isMobile={isMobile} $isHidden={isHidden}></HeaderCell>
                </ExpensesHeader>

                <ExpensesList>
                    {Array.isArray(userData) && userData.length > 0 ? (
                        userData.map((item, index) => {
                            return (
                                <ExpensesItem key={item._id || index} $isMobile={isMobile}>
                                    <ItemCell $isVisible={isVisible}>{item.description}</ItemCell>
                                    <ItemCell $isVisible={isVisible}>{categoryList.find((cat) => cat.category === item.category)?.name || item.category}</ItemCell>
                                    <ItemCell $isVisible={isVisible}>{formattedDate(item.date)}</ItemCell>
                                    <ItemCell style={{ justifyContent: 'flex-end' }} $isVisible={isVisible}>
                                        {formatNum(item.sum)} &#8381;
                                    </ItemCell>
                                    <ItemCellImg $isVisible={isVisible} $isMobile={isMobile}>
                                        <CartSVG />
                                    </ItemCellImg>
                                </ExpensesItem>
                            )
                        })
                    ) : (
                        <ExpensesItem>Нет расходов</ExpensesItem>
                    )}
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
