import { useEffect, useState } from 'react'
import { FlexContainer, PrimaryButton, Section, SectionTitle } from '../../styles/GlobalStyled'
import CartSVG from '../icons/CategoryIcons/CartSVG'

import { ExpensesHeader, ExpensesItem, ExpensesList, ExpensesSection, FilterContainer, HeaderCell, ItemCell, ItemCellImg } from './Expenses.styles'
import { useAuthContext } from '../../contexts/AuthContext'
import { formattedDate } from '../../utils/date-fns'
import { categoryList } from '../../data/CategoryList'
import { formatNum } from '../../utils/formatNum'
import FilterModal from '../FilterModal/FilterModal'
import { useAppContext } from '../../contexts/AppContext'

function ExpensesTable({ $flex }) {
    const { userData } = useAuthContext()
    const { isMobile } = useAppContext()
    const [color, setColor] = useState(true)
    const [isVisible, setIsVisible] = useState()
    const [isHidden, setIsHidden] = useState(true)
    const [filterType, setFilterType] = useState(null)
    const [isOpenFilterModal, setIsOpenFilterModal] = useState(false)

    const openFilterModal = (type) => {
        if (filterType === type) {
            // Если клик по тому же типу, что и сейчас активный, закрываем модалку
            setFilterType(null)
        } else {
            // Иначе открываем модалку для выбранного типа
            setFilterType(type)
        }
        setIsOpenFilterModal(true)
    }

    const closeFilterModal = () => {
        setFilterType(null)

        setIsOpenFilterModal(false)
    }

    useEffect(() => {
        setIsVisible(isMobile ? true : false)
        console.log(isMobile)
    }, [isMobile])

    return (
        <>
            <ExpensesSection $isMobile={isMobile} $flex={$flex}>
                {!isMobile && <SectionTitle>Таблица расходов</SectionTitle>}

                <ExpensesHeader $isMobile={isMobile}>
                    <HeaderCell $isMobile={isMobile} $isVisible={isVisible}>
                        Описание
                    </HeaderCell>

                    <FilterContainer>
                        <HeaderCell $active={filterType === 'category'} $filter onClick={() => openFilterModal('category')} $isMobile={isMobile} $isVisible={isVisible}>
                            Категория
                        </HeaderCell>
                        <FilterModal $active={filterType === 'category'} type={filterType} onClose={closeFilterModal} />
                    </FilterContainer>

                    <FilterContainer>
                        <HeaderCell $active={filterType === 'date'} onClick={() => openFilterModal('date')} $filter $isMobile={isMobile} $isVisible={isVisible}>
                            Дата
                        </HeaderCell>
                        <FilterModal $active={filterType === 'date'} type={filterType} onClose={closeFilterModal} />
                    </FilterContainer>

                    <FilterContainer>
                        <HeaderCell $active={filterType === 'sum'} onClick={() => openFilterModal('sum')} $filter $isMobile={isMobile} $isVisible={isVisible}>
                            Сумма
                        </HeaderCell>

                        <FilterModal $active={filterType === 'sum'} type={filterType} onClose={closeFilterModal} />
                    </FilterContainer>

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
                                    <ItemCell style={{ justifyContent: 'flex-end', overflow: 'visible' }} $isVisible={isVisible}>
                                        {formatNum(item.sum)} &#8381;
                                    </ItemCell>
                                    <ItemCellImg $isVisible={isVisible} $isMobile={isMobile}>
                                        <CartSVG />
                                    </ItemCellImg>
                                </ExpensesItem>
                            )
                        })
                    ) : (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>Нет расходов</div>
                            <button>Обновить данные</button>
                        </>
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
