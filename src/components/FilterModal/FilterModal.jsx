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

function FilterModal({ type, onClose, $active }) {
    const { activeCategories, startDate, endDate, activeDistaffMoney, setActiveCategories, setStartDate, setEndDate, setActiveDistaffMoney, showToast } = useAppContext()

    const { token, setUserData } = useAuthContext()
    const { fetchData } = useFetch()
    const [searchParams, setSearchParams] = useSearchParams()

    // === UNIFIED APPLY FUNCTION ===
    const applyAllFilters = async () => {
        const urlParams = new URLSearchParams()

        // === CATEGORY ===
        if (activeCategories.length > 0) {
            urlParams.append('filterBy', activeCategories.join(','))
        }

        // === DATE ===
        if (startDate && endDate) {
            urlParams.append('sortBy', 'date')
            // Не добавляем dateFrom/dateTo в URL, если это не POST /period
            // Если даты выбраны, НО нет других фильтров → POST /period
            if (activeCategories.length === 0 && activeDistaffMoney.length === 0) {
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

                    // Обновляем URL
                    const periodParams = new URLSearchParams()
                    periodParams.append('dateFrom', formattedDateForApi(startDate))
                    periodParams.append('dateTo', formattedDateForApi(endDate))
                    setSearchParams(periodParams, { replace: true })
                    showToast('Фильтр по периоду применен', 'success')
                } catch (error) {
                    console.error('Ошибка фильтрации по периоду:', error)
                    showToast('Ошибка фильтрации по периоду', 'error')
                }

                onClose()
                return
            } else {
                // Добавляем даты как параметры для GET, если есть другие фильтры
                urlParams.append('dateFrom', formattedDateForApi(startDate))
                urlParams.append('dateTo', formattedDateForApi(endDate))
            }
        }

        // === SUM ===
        if (activeDistaffMoney.length === 2) {
            // Важно: добавляем только sortBy=sum, без minSum/maxSum
            urlParams.append('sortBy', 'sum')
        }

        // === MAKE REQUEST (GET) ===
        if (urlParams.toString()) {
            try {
                const response = await fetchData({
                    url: 'transactions',
                    urlParams: `?${urlParams.toString()}`,
                    method: 'get',
                    token,
                })

                setUserData(response)
                setSearchParams(urlParams, { replace: true })
                showToast('Фильтры применены', 'success')
            } catch (error) {
                console.error('Ошибка применения фильтров:', error)
                showToast('Ошибка применения фильтров', 'error')
            }
        } else {
            showToast('Нет активных фильтров', 'warning')
        }

        onClose()
    }

    // === RESET ALL ===
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

    // === CHECK IF ANY FILTER IS ACTIVE ===
    const hasActiveFilters = () => {
        return activeCategories.length > 0 || (startDate && endDate) || activeDistaffMoney.length === 2
    }

    return (
        <FilterWrapper $active={$active}>
            <FilterArea>
                {type === 'category' && <Category />}
                {type === 'date' && <CalendarComponent $isFilter />}
                {type === 'sum' && <MoneyFilter />}

                <PrimaryButton onClick={resetFilters}>Сбросить всё</PrimaryButton>

                {/* === APPLY ALL FILTERS BUTTON (всегда активна, если есть фильтры) === */}
                <PrimaryButton onClick={applyAllFilters} disabled={!hasActiveFilters()}>
                    Применить фильтры
                </PrimaryButton>

                <PrimaryButton onClick={onClose}>Закрыть</PrimaryButton>
            </FilterArea>
        </FilterWrapper>
    )
}

export default FilterModal
