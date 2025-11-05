import { useEffect, useState } from 'react'
import { FlexContainer, PrimaryButton, SectionTitle } from '../../styles/GlobalStyled'
import CartSVG from '../icons/CategoryIcons/CartSVG'
import EditSVG from '../icons/CategoryIcons/EditSVG'
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
    const { activeCategories, startDate, endDate, activeDistaffMoney, isMobile, isEditMode, setIsEditMode } = useAppContext()

    const [isVisible, setIsVisible] = useState(false)
    const [filterType, setFilterType] = useState(null)
    const [isOpenFilterModal, setIsOpenFilterModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const { fetchData } = useFetch()

    const isFilterActive = activeCategories.length > 0 || (startDate && endDate) || activeDistaffMoney.length === 2
    const [minSum, setMinSum] = useState(activeDistaffMoney[0])
    const [maxSum, setMaxSum] = useState(activeDistaffMoney[1])

    const filteredData = userData.filter((item) => {
        if (!isFilterActive) return true
        const itemDate = new Date(item.date)
        if (startDate && itemDate < new Date(startDate)) return false
        if (endDate && itemDate > new Date(endDate)) return false
        if (activeCategories.length > 0 && !activeCategories.includes(item.category)) return false
        if (activeDistaffMoney.length === 2) {
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

    // Выбор элемента (для мобилки — удаление, для всех — редактирование)
    const handleSelectItem = (item) => {
        if (isMobile) {
            setSelectedItem(selectedItem?._id === item._id ? null : item)
        }
    }
    const resetInput = () => {
        setSelectedItem(null)
    }

    // Переключение режима редактирования
    const toggleEditMode = (id) => {
        setIsEditMode(isEditMode === id ? null : id)
    }

    const handleDelete = async (itemToDelete) => {
        if (!itemToDelete) return
        try {
            await fetchData({ url: 'transactions', method: 'delete', token, id: itemToDelete._id })
            const updatedData = await fetchData({ url: 'transactions', token })
            setUserData(updatedData)
            if (isMobile) setSelectedItem(null)
            // Выход из режима редактирования при удалении
            if (isEditMode === itemToDelete._id) setIsEditMode(null)
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
                    <HeaderCell
                        $activeFilter={activeCategories.length > 0}
                        $active={filterType === 'category'}
                        $filter
                        onClick={() => openFilterModal('category')}
                        $isMobile={isMobile}
                        $isVisible={isVisible}
                    >
                        Категория
                    </HeaderCell>
                    <FilterModal $active={filterType === 'category'} type="category" onClose={closeFilterModal} />
                </FilterContainer>
                <FilterContainer>
                    <HeaderCell
                        $activeFilter={startDate && endDate && startDate !== endDate}
                        $active={filterType === 'date'}
                        $filter
                        onClick={() => openFilterModal('date')}
                        $isMobile={isMobile}
                        $isVisible={isVisible}
                    >
                        Дата
                    </HeaderCell>
                    <FilterModal $active={filterType === 'date'} type="date" onClose={closeFilterModal} />
                </FilterContainer>
                <FilterContainer>
                    <HeaderCell
                        $activeFilter={minSum !== activeDistaffMoney[0] || maxSum !== activeDistaffMoney[1]}
                        $active={filterType === 'sum'}
                        $filter
                        onClick={() => openFilterModal('sum')}
                        $isMobile={isMobile}
                        $isVisible={isVisible}
                    >
                        Сумма
                    </HeaderCell>
                    <FilterModal $active={filterType === 'sum'} type="sum" onClose={closeFilterModal} />
                </FilterContainer>
                <HeaderCell $isMobile={isMobile}></HeaderCell>
            </ExpensesHeader>

            <ExpensesList>
                {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                        <ExpensesItem
                            $editItem={isEditMode === item._id}
                            key={item._id}
                            $choiseItem={isMobile && selectedItem?._id === item._id}
                            onClick={() => handleSelectItem(item)}
                            $isMobile={isMobile}
                        >
                            <ItemCell $isVisible={isVisible}>{item.description}</ItemCell>
                            <ItemCell $isVisible={isVisible}>{categoryList.find((cat) => cat.category === item.category)?.name || item.category}</ItemCell>
                            <ItemCell $isVisible={isVisible}>{formattedDate(item.date)}</ItemCell>
                            <ItemCell style={{ justifyContent: 'flex-end' }} $isVisible={isVisible}>
                                {formatNum(item.sum)} ₽
                            </ItemCell>
                            {/* Десктоп: иконки удаления и редактирования */}
                            {!isMobile && (
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <ItemCellImg
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleDelete(item)
                                        }}
                                        $isVisible={isVisible}
                                    >
                                        <CartSVG />
                                    </ItemCellImg>

                                    <ItemCellImg
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            toggleEditMode(item._id)
                                        }}
                                        $isVisible={isVisible}
                                        $isEditModeActive={isEditMode === item._id}
                                    >
                                        <EditSVG />
                                    </ItemCellImg>
                                </div>
                            )}
                        </ExpensesItem>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Нет расходов</div>
                )}
            </ExpensesList>

            {/* Кнопка удаления на мобилке */}
            {isMobile && (
                <FlexContainer style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <PrimaryButton disabled={!selectedItem?._id} onClick={() => handleDelete(selectedItem)}>
                        Удалить расход
                    </PrimaryButton>
                    {selectedItem && (
                        <PrimaryButton disabled={!selectedItem?._id} onClick={() => handleDelete(selectedItem)}>
                            Редактировать расход
                        </PrimaryButton>
                    )}
                </FlexContainer>
            )}
        </ExpensesSection>
    )
}

export default ExpensesTable
