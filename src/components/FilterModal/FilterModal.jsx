// components/FilterModal/FilterModal.jsx
import { FilterArea, FilterWrapper } from './FilterModal.styles'
import Category from '../Category/Category'
import CalendarComponent from '../Calendar/Calendar'
import MoneyFilter from '../MoneyFilter/MoneyFilter'
import { PrimaryButton } from '../../styles/GlobalStyled'
import { useSearchParams } from 'react-router-dom'
import { formattedDate } from '../../utils/date-fns'
import { useAuthContext } from '../../contexts/AuthContext'
import { useAppContext } from '../../contexts/AppContext'
import { useFetch } from '../../hooks/useFetch'

function FilterModal({ type, onClose, $active }) {
    const { activeCategories, setActiveCategories, startDate, setStartDate, endDate, setEndDate, activeDistaffMoney, setActiveDistaffMoney, showToast } = useAppContext()

    const { token, setUserData } = useAuthContext()
    const { fetchData } = useFetch()
    const [searchParams, setSearchParams] = useSearchParams()

    // Проверка, есть ли активные фильтры
    const hasActiveFilters = () => {
        return activeCategories.length > 0 || (startDate && endDate) || activeDistaffMoney.length === 2
    }

    // === DATE ACTIONS ===
    // Сортировка по дате: GET /api/transactions?sortBy=date
    const applySortByDate = async () => {
        if (!startDate || !endDate) {
            showToast('Выберите даты', 'error')
            return
        }

        try {
            const urlParams = new URLSearchParams()
            urlParams.append('sortBy', 'date')

            const response = await fetchData({
                url: 'transactions',
                urlParams: `?${urlParams.toString()}`,
                method: 'get',
                token,
            })

            setUserData(response)

            setSearchParams(urlParams, { replace: true })
            showToast('Сортировка по дате применена (API)', 'success')
        } catch (error) {
            console.error('Ошибка сортировки по дате:', error)
            showToast('Ошибка сортировки по дате', 'error')
        }

        onClose()
    }

    // Фильтр по периоду: POST /api/transactions/period
    const applyFilterByPeriod = async () => {
        if (!startDate || !endDate) {
            showToast('Выберите даты', 'error')
            return
        }

        const requestBody = {
            start: formattedDate(startDate), // формат: YYYY-MM-DD
            end: formattedDate(endDate),
        }

        try {
            const response = await fetchData({
                url: 'transactions/period',
                method: 'post',
                data: requestBody,
                token,
            })

            setUserData(response)

            // Для наглядности: тоже обновляем URL
            const urlParams = new URLSearchParams()
            urlParams.append('dateFrom', formattedDate(startDate))
            urlParams.append('dateTo', formattedDate(endDate))
            urlParams.append('sortBy', 'date')
            setSearchParams(urlParams, { replace: true })

            showToast('Фильтр по периоду применен (API)', 'success')
        } catch (error) {
            console.error('Ошибка фильтрации по периоду:', error)
            showToast('Ошибка фильтрации по периоду', 'error')
        }

        onClose()
    }

    // === COMMON ACTIONS ===
    // Сброс фильтров
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

                {/* === DATE FILTER BUTTONS === */}
                {type === 'date' && (
                    <>
                        <PrimaryButton onClick={applySortByDate} disabled={!startDate || !endDate}>
                            Сортировать по дате (API)
                        </PrimaryButton>
                        <PrimaryButton onClick={applyFilterByPeriod} disabled={!startDate || !endDate}>
                            Фильтр по периоду (API)
                        </PrimaryButton>
                    </>
                )}

                {/* === OTHER FILTER BUTTONS === */}
                {type !== 'date' && (
                    <PrimaryButton
                        onClick={() => {
                            /* TODO: другие фильтры */
                        }}
                        disabled={!hasActiveFilters()}
                    >
                        Применить фильтры
                    </PrimaryButton>
                )}

                <PrimaryButton onClick={onClose}>Закрыть</PrimaryButton>
            </FilterArea>
        </FilterWrapper>
    )
}

export default FilterModal
