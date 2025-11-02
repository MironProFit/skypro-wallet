import { useEffect } from 'react'
import { FilterArea, FilterWrapper } from './FilterModal.styles'
import Category from '../Category/Category' // ← исправил опечатку в имени
import { PrimaryButton } from '../../styles/GlobalStyled'
import CalendarComponent from '../Calendar/Calendar'
import MoneyFilter from '../MoneyFilter/MoneyFilter'
import { useLocation } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { useFetch } from '../../hooks/useFetch'
import { useAppContext } from '../../contexts/AppContext'

function FilterModal({ type, onClose, $active }) {
    const { activeCategories, setActiveCategories, activeDistaffMoney, setActiveDistaffMoney, startDate, setStartDate, endDate, setEndDate } = useAppContext()

    const { urlApi, token } = useAuthContext()
    const { fetchData } = useFetch()

    const handleCloseModalFilter = () => {
        onClose()
    }

    const hasActiveFilters = () => {
        if (type === 'category') {
            return Array.isArray(activeCategories) && activeCategories.length > 0
        } else if (type === 'date') {
            return startDate && endDate && startDate !== endDate
        } else if (type === 'sum') {
            return Array.isArray(activeDistaffMoney) && activeDistaffMoney[0] !== activeDistaffMoney[1]
        }
        return false
    }

    const clearFilters = () => {
        setActiveCategories([])
        setStartDate(null)
        setEndDate(null)
        setActiveDistaffMoney([]) // или как у тебя по умолчанию
    }

    const handleResetFilters = () => {
        clearFilters()
    }

    // Обработчик выбора категории (для multi-режима)
    const onCategory = (category) => {
        // console.log(category)
        // В multi-режиме управление — внутри Category, но можно и здесь
        // Пока оставим пустым, если Category сам управляет
    }

    const checkFilterLocal = () => {
        console.log(activeCategories, activeDistaffMoney, startDate, endDate)
        onClose()
    }
    const checkFilterLocalApi = async () => {
        console.log(type)
        // try {

        //     const response = await fetchData({})
        // } catch (error) {}

        onClose()
    }

    return (
        <FilterWrapper $active={$active} $isOpenFilter>
            <FilterArea>
                {type === 'category' && (
                    <>
                        <Category mode="multi" onCategory={onCategory} />
                        <PrimaryButton onClick={handleResetFilters} disabled={!hasActiveFilters()}>
                            Сбросить фильтр
                        </PrimaryButton>
                    </>
                )}
                {type === 'date' && (
                    <>
                        <CalendarComponent $isFilter={true} />
                        <PrimaryButton onClick={handleResetFilters} disabled={!hasActiveFilters()}>
                            Сбросить фильтр
                        </PrimaryButton>
                    </>
                )}
                {type === 'sum' && (
                    <>
                        <MoneyFilter setActiveDistaffMoney={setActiveDistaffMoney} />
                        <PrimaryButton onClick={handleResetFilters} disabled={!hasActiveFilters()}>
                            Сбросить фильтр
                        </PrimaryButton>
                    </>
                )}

                <PrimaryButton disabled={!hasActiveFilters()} onClick={checkFilterLocal}>
                    Выбрать
                </PrimaryButton>

                <PrimaryButton onClick={checkFilterLocalApi}>Получить из API</PrimaryButton>

                <PrimaryButton onClick={handleCloseModalFilter}>Закрыть</PrimaryButton>
            </FilterArea>
        </FilterWrapper>
    )
}

export default FilterModal
