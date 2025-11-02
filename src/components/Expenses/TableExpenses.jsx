import { useEffect, useState } from 'react'
import { FlexContainer, PrimaryButton, SectionTitle } from '../../styles/GlobalStyled'
import CartSVG from '../icons/CategoryIcons/CartSVG'
import { ExpensesHeader, ExpensesItem, ExpensesList, ExpensesSection, FilterContainer, HeaderCell, ItemCell, ItemCellImg } from './Expenses.styles'
import { useAuthContext } from '../../contexts/AuthContext'
import { formattedDate } from '../../utils/date-fns'
import { categoryList } from '../../data/CategoryList'
import { formatNum } from '../../utils/formatNum'
import FilterModal from '../FilterModal/FilterModal'
import { useAppContext } from '../../contexts/AppContext'
import { useFetch } from '../../hooks/useFetch'

function ExpensesTable({ $flex }) {
    const { userData, token, setToastNotification, setUserData } = useAuthContext()
    const { activeCategories, startDate, endDate, activeDistaffMoney } = useAppContext()
    const { isMobile } = useAppContext()

    const [isVisible, setIsVisible] = useState(false)
    const [isHidden, setIsHidden] = useState(true)
    const [filterType, setFilterType] = useState(null)
    const [isOpenFilterModal, setIsOpenFilterModal] = useState(false)
    const [choiseItem, setChoiseItem] = useState('')
    const { fetchData } = useFetch()

    // Определяем, включена ли фильтрация
    const isFilterActive = activeCategories.length > 0 || (startDate && endDate) || activeDistaffMoney.length === 2

    // ✅ Фильтрация — ТОЛЬКО внутри функции
    const filteredData = userData.filter((item) => {
        if (!isFilterActive) return true

        // Фильтр по дате
        const itemDate = new Date(item.date)
        if (startDate && itemDate < new Date(startDate)) return false
        if (endDate && itemDate > new Date(endDate)) return false

        // Фильтр по категориям
        if (activeCategories.length > 0 && !activeCategories.includes(item.category)) return false

        // Фильтр по сумме
        if (activeDistaffMoney.length === 2) {
            const [minSum, maxSum] = activeDistaffMoney
            if (item.sum < minSum || item.sum > maxSum) return false
        }

        return true
    })

    useEffect(() => {
        setIsVisible(isMobile)
    }, [isMobile])

    const openFilterModal = (type) => {
        setFilterType(filterType === type ? null : type)
        setIsOpenFilterModal(true)
    }

    const closeFilterModal = () => {
        setFilterType(null)
        setIsOpenFilterModal(false)
    }

    const handleChoiseItem = (id) => {
        setChoiseItem(id)
    }

    const onDeleteItem = async () => {
        if (!choiseItem) return
        try {
            await fetchData({ url: 'transactions', method: 'delete', token, id: choiseItem })
            const updatedData = await fetchData({ url: 'transactions', token })
            setUserData(updatedData)
            setChoiseItem('')
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Ошибка'
            setToastNotification(errorMessage)
            console.error('Ошибка удаления:', error)
        }
    }

    return (
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
                    <FilterModal $active={filterType === 'category'} type="category" onClose={closeFilterModal} />
                </FilterContainer>

                <FilterContainer>
                    <HeaderCell $active={filterType === 'date'} $filter onClick={() => openFilterModal('date')} $isMobile={isMobile} $isVisible={isVisible}>
                        Дата
                    </HeaderCell>
                    <FilterModal $active={filterType === 'date'} type="date" onClose={closeFilterModal} />
                </FilterContainer>

                <FilterContainer>
                    <HeaderCell $active={filterType === 'sum'} $filter onClick={() => openFilterModal('sum')} $isMobile={isMobile} $isVisible={isVisible}>
                        Сумма
                    </HeaderCell>
                    <FilterModal $active={filterType === 'sum'} type="sum" onClose={closeFilterModal} />
                </FilterContainer>

                <HeaderCell $isMobile={isMobile} $isHidden={isHidden}></HeaderCell>
            </ExpensesHeader>

            <ExpensesList>
                {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                        <ExpensesItem key={item._id} $choiseItem={item._id === choiseItem} onClick={() => handleChoiseItem(item._id)} $isMobile={isMobile}>
                            <ItemCell $isVisible={isVisible}>{item.description}</ItemCell>
                            <ItemCell $isVisible={isVisible}>{categoryList.find((cat) => cat.category === item.category)?.name || item.category}</ItemCell>
                            <ItemCell $isVisible={isVisible}>{formattedDate(item.date)}</ItemCell>
                            <ItemCell style={{ justifyContent: 'flex-end' }} $isVisible={isVisible}>
                                {formatNum(item.sum)} ₽
                            </ItemCell>
                            <ItemCellImg
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onDeleteItem()
                                }}
                                $isVisible={isVisible}
                                $isMobile={isMobile}
                            >
                                <CartSVG />
                            </ItemCellImg>
                        </ExpensesItem>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Нет расходов</div>
                )}
            </ExpensesList>

            {isMobile && choiseItem && (
                <FlexContainer>
                    <PrimaryButton onClick={onDeleteItem}>Удалить расход</PrimaryButton>
                </FlexContainer>
            )}
        </ExpensesSection>
    )
}

export default ExpensesTable
