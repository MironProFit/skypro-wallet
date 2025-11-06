// components/FilterModal/FilterModal.jsx
import { FilterArea, FilterWrapper } from './FilterModal.styles'
import Category from '../Category/Category'
import CalendarComponent from '../Calendar/Calendar'
import MoneyFilter from '../MoneyFilter/MoneyFilter'
import { PrimaryButton } from '../../styles/GlobalStyled'
import { useSearchParams } from 'react-router-dom'
import { formattedDateForApi } from '../../utils/date-fns'
import { useAuthContext } from '../../contexts/AuthContext'
import { useAppContext } from '../../contexts/AppContext'
import { useFetch } from '../../hooks/useFetch'

// components/FilterModal/FilterModal.jsx
// ...
function FilterModal({ type, onClose, $active }) {
    const { activeCategories, startDate, endDate, activeDistaffMoney, setActiveCategories, setStartDate, setEndDate, setActiveDistaffMoney, showToast } = useAppContext()

    const { token, setUserData } = useAuthContext()
    const { fetchData } = useFetch()
    const [searchParams, setSearchParams] = useSearchParams()

    // === APPLY SUM SORTING (всегда активна) ===
    const applySumSorting = async () => {
        // ✅ НЕ проверяем activeDistaffMoney.length
        try {
            const urlParams = new URLSearchParams()
            urlParams.append('sortBy', 'sum')

            const response = await fetchData({
                url: 'transactions',
                urlParams: `?${urlParams.toString()}`,
                method: 'get',
                token,
            })

            setUserData(response)
            setSearchParams(urlParams, { replace: true })
            showToast('Сортировка по сумме применена', 'success')
        } catch (error) {
            console.error('Ошибка сортировки по сумме:', error)
            showToast('Ошибка сортировки по сумме', 'error')
        }

        onClose()
    }

    // === APPLY DATE SORTING (всегда активна) ===
    const applyDateSorting = async () => {
        // ✅ НЕ проверяем startDate и endDate
        try {
            const urlParams = new URLSearchParams()
            urlParams.append('sortBy', 'date')
            // Если даты не выбраны — сервер сам решит, что делать (например, по умолчанию за месяц)
            if (startDate && endDate) {
                urlParams.append('dateFrom', formattedDateForApi(startDate))
                urlParams.append('dateTo', formattedDateForApi(endDate))
            }

            const response = await fetchData({
                url: 'transactions',
                urlParams: `?${urlParams.toString()}`,
                method: 'get',
                token,
            })

            setUserData(response)
            setSearchParams(urlParams, { replace: true })
            showToast('Сортировка по дате применена', 'success')
        } catch (error) {
            console.error('Ошибка сортировки по дате:', error)
            showToast('Ошибка сортировки по дате', 'error')
        }

        onClose()
    }

    // === APPLY PERIOD FILTER (POST) — как было ===
    const applyPeriodFilter = async () => {
        if (!startDate || !endDate) {
            showToast('Выберите даты', 'error')
            return
        }

        const requestBody = {
            start: formattedDateForApi(startDate),
            end: formattedDateForApi(endDate),
        }

        try {
            const response = await fetchData({
                url: 'transactions/period',
                method: 'post',
                requestBody,
                token,
            })

            setUserData(response)

            const urlParams = new URLSearchParams()
            urlParams.append('dateFrom', formattedDateForApi(startDate))
            urlParams.append('dateTo', formattedDateForApi(endDate))
            urlParams.append('sortBy', 'date')
            setSearchParams(urlParams, { replace: true })

            showToast('Фильтр по периоду применен', 'success')
        } catch (error) {
            console.error('Ошибка фильтрации по периоду:', error)
            showToast('Ошибка фильтрации по периоду', 'error')
        }

        onClose()
    }

    // === APPLY CATEGORY FILTER — как было ===
    const applyCategoryFilter = async () => {
        if (!activeCategories.length) return

        try {
            const urlParams = new URLSearchParams()
            urlParams.append('filterBy', activeCategories.join(','))
            const response = await fetchData({
                url: 'transactions',
                urlParams: `?${urlParams.toString()}`,
                method: 'get',
                token,
            })

            setUserData(response)
            setSearchParams(urlParams, { replace: true })
            showToast('Фильтр по категориям применен', 'success')
        } catch (error) {
            console.error('Ошибка фильтрации по категориям:', error)
            showToast('Ошибка фильтрации по категориям', 'error')
        }

        onClose()
    }

    // === RESET ===
    const resetFilters = async () => {
        try {
            const response = await fetchData({ url: 'transactions', method: 'get', token })
            setUserData(response)
            setSearchParams(new URLSearchParams(), { replace: true })
            showToast('Все фильтры сброшены', 'success')
        } catch (error) {
            console.error('Ошибка сброса фильтров:', error)
            showToast('Ошибка сброса фильтров', 'error')
        }

        setActiveCategories([])
        setStartDate(null)
        setEndDate(null)
        setActiveDistaffMoney([])

        onClose()
    }

    return (
        <FilterWrapper $active={$active}>
            <FilterArea>
                {type === 'category' && <Category />}
                {type === 'date' && <CalendarComponent $isFilter />}
                {type === 'sum' && <MoneyFilter />}

                <PrimaryButton onClick={resetFilters}>Сбросить всё</PrimaryButton>

                {/* === CATEGORY BUTTON (активна, если есть категории) === */}
                {type === 'category' && (
                    <PrimaryButton onClick={applyCategoryFilter} disabled={!activeCategories.length}>
                        Применить категории
                    </PrimaryButton>
                )}

                {/* === DATE BUTTONS (все активны, независимо от дат) === */}
                {type === 'date' && (
                    <>
                        <PrimaryButton onClick={applyDateSorting}>Применить по дате</PrimaryButton>
                        <PrimaryButton onClick={applyPeriodFilter} disabled={!startDate || !endDate}>
                            Применить период
                        </PrimaryButton>
                    </>
                )}

                {/* === SUM BUTTON (всегда активна) === */}
                {type === 'sum' && <PrimaryButton onClick={applySumSorting}>Применить сумму</PrimaryButton>}

                <PrimaryButton onClick={onClose}>Закрыть</PrimaryButton>
            </FilterArea>
        </FilterWrapper>
    )
}

export default FilterModal
