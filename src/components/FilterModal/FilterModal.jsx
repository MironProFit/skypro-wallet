import { useEffect } from 'react'
import { FilterArea, FilterWrapper } from './FilterModal.styles'
import Category from '../Category/Category'
import CalendarComponent from '../Calendar/Calendar'
import MoneyFilter from '../MoneyFilter/MoneyFilter'
import { PrimaryButton } from '../../styles/GlobalStyled'
import { useSearchParams } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { useFetch } from '../../hooks/useFetch'
import { useAppContext } from '../../contexts/AppContext'
import { formattedDate } from '../../utils/date-fns'

const LOCAL_KEYS = ['categoryFilter', 'dateFrom', 'dateTo', 'sumMin', 'sumMax']
const API_KEYS = ['filterBy', 'sortBy', 'dateFrom', 'dateTo']

function FilterModal({ type, onClose, $active }) {
    const { activeCategories, setActiveCategories, startDate, setStartDate, endDate, setEndDate, activeDistaffMoney, setActiveDistaffMoney } = useAppContext()

    const { token } = useAuthContext()
    const { fetchData } = useFetch()
    const [searchParams, setSearchParams] = useSearchParams()

    // Удалить локальные ключи из URL
    const clearLocal = () => {
        const p = new URLSearchParams(searchParams)
        LOCAL_KEYS.forEach((k) => p.delete(k))
        return p
    }
    // Удалить API-ключи из URL
    const clearApi = () => {
        const p = new URLSearchParams(searchParams)
        API_KEYS.forEach((k) => p.delete(k))
        return p
    }

    // Построить URL для локального фильтра
    const buildLocal = () => {
        const p = clearLocal()
        if (type === 'category' && activeCategories.length) {
            p.set('categoryFilter', activeCategories.join(','))
        }
        if (type === 'date' && startDate && endDate && startDate !== endDate) {
            p.set('dateFrom', formattedDate(startDate))
            p.set('dateTo', formattedDate(endDate))
        }
        if (type === 'sum' && activeDistaffMoney.length === 2) {
            const [min, max] = activeDistaffMoney
            p.set('sumMin', min.toString())
            p.set('sumMax', max.toString())
        }
        return p
    }

    // Проверки наличия фильтра
    const hasLocal = () => {
        if (type === 'category') return activeCategories.length > 0
        if (type === 'date') return startDate && endDate && startDate !== endDate
        if (type === 'sum') return activeDistaffMoney.length === 2 && activeDistaffMoney[0] !== activeDistaffMoney[1]
        return false
    }
    const hasApi = () => {
        if (type === 'category') return !!searchParams.get('filterBy')
        if (type === 'date') return searchParams.get('dateFrom') && searchParams.get('dateTo') && searchParams.get('sortBy') === 'date'
        if (type === 'sum') return searchParams.get('sortBy') === 'sum'
        return false
    }

    // Сбросить всё
    const resetAll = () => {
        setActiveCategories([])
        setStartDate(null)
        setEndDate(null)
        setActiveDistaffMoney([])
        setSearchParams(new URLSearchParams(), { replace: true })
        onClose()
    }

    // ========== ACTIONS ==========

    // 1) Локальный фильтр
    const applyLocal = () => {
        setSearchParams(buildLocal(), { replace: true })
        onClose()
    }

    // 2) API-фильтр Category
    const applyApiCategory = async () => {
        if (hasApi()) {
            setSearchParams(new URLSearchParams(), { replace: true })
            onClose()
            return
        }
        const p = clearApi()
        p.set('filterBy', activeCategories.join(','))
        await fetchData({
            url: `transactions?${p.toString()}`,
            method: 'get',
            token,
        })
        setSearchParams(p, { replace: true })
        onClose()
    }

    // 3) API-сортировка по сумме
    const applyApiSortSum = async () => {
        if (hasApi()) {
            setSearchParams(new URLSearchParams(), { replace: true })
            onClose()
            return
        }
        const p = clearApi()
        p.set('sortBy', 'sum')
        await fetchData({
            url: `transactions?${p.toString()}`,
            method: 'get',
            token,
        })
        setSearchParams(p, { replace: true })
        onClose()
    }

    // 4) API-сортировка по дате (GET ?sortBy=date)
    const applyApiSortDate = async () => {
        if (hasApi()) {
            setSearchParams(new URLSearchParams(), { replace: true })
            onClose()
            return
        }
        const p = clearApi()
        p.set('sortBy', 'date')
        await fetchData({
            url: `transactions?${p.toString()}`,
            method: 'get',
            token,
        })
        setSearchParams(p, { replace: true })
        onClose()
    }

    // 5) API-фильтр по периоду (POST /transactions/period)
    const applyApiPeriod = async () => {
        if (hasApi()) {
            setSearchParams(new URLSearchParams(), { replace: true })
            onClose()
            return
        }
        await fetchData({
            url: 'transactions/period',
            method: 'post',
            token,
            body: {
                dateFrom: formattedDate(startDate),
                dateTo: formattedDate(endDate),
            },
        })
        // Для наглядности — тоже сохраняем в URL
        const p = clearApi()
        p.set('dateFrom', formattedDate(startDate))
        p.set('dateTo', formattedDate(endDate))
        p.set('sortBy', 'date')
        setSearchParams(p, { replace: true })
        onClose()
    }

    return (
        <FilterWrapper $active={$active}>
            <FilterArea>
                {type === 'category' && <Category mode="multi" />}

                {type === 'date' && <CalendarComponent $isFilter />}

                {type === 'sum' && <MoneyFilter />}

                <PrimaryButton onClick={resetAll} disabled={!hasLocal() && !hasApi()}>
                    Сбросить всё
                </PrimaryButton>

                {/* ====== CATEGORY ====== */}
                {type === 'category' && (
                    <>
                        <PrimaryButton onClick={applyLocal} disabled={!hasLocal()}>
                            Выбрать категории (локально)
                        </PrimaryButton>
                        <PrimaryButton onClick={applyApiCategory} disabled={!hasLocal() && !hasApi()}>
                            {hasApi() ? 'Сбросить API-фильтр' : 'Применить API-фильтр'}
                        </PrimaryButton>
                    </>
                )}

                {/* ====== DATE ====== */}
                {type === 'date' && (
                    <>
                        {/* локально */}
                        <PrimaryButton onClick={applyLocal} disabled={!hasLocal()}>
                            Фильтр по периоду (локально)
                        </PrimaryButton>

                        {/* API: GET sortBy=date */}
                        <PrimaryButton onClick={applyApiSortDate} disabled={!hasLocal() && !hasApi()}>
                            {hasApi() ? 'Сбросить API-сортировку' : 'Сортировать по дате (API)'}
                        </PrimaryButton>

                        {/* API: POST /transactions/period */}
                        <PrimaryButton onClick={applyApiPeriod} disabled={!hasLocal() && !hasApi()}>
                            {hasApi() ? 'Сбросить API-фильтр' : 'Фильтр по периоду (API)'}
                        </PrimaryButton>
                    </>
                )}

                {/* ====== SUM ====== */}
                {type === 'sum' && (
                    <>
                        <PrimaryButton onClick={applyLocal} disabled={!hasLocal()}>
                            Фильтр по сумме (локально)
                        </PrimaryButton>
                        <PrimaryButton onClick={applyApiSortSum} disabled={!hasLocal() && !hasApi()}>
                            {hasApi() ? 'Сбросить API-сортировку' : 'Сортировать по сумме (API)'}
                        </PrimaryButton>
                    </>
                )}

                <PrimaryButton onClick={onClose}>Закрыть</PrimaryButton>
            </FilterArea>
        </FilterWrapper>
    )
}

export default FilterModal
