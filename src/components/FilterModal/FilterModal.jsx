import { useEffect, useState } from 'react'
import { FilterArea, FilterWrapper } from './FilterModal.styles'
import Catagory from '../Category/Catagory'
import { PrimaryButton } from '../../styles/GlobalStyled'
import CalendarComponent from '../Calendar/Calendar'
import MoneyFilter from '../MoneyFilter/MoneyFilter'
import { useLocation } from 'react-router-dom'

function FilterModal({ type, onClose, $active }) {
    const location = useLocation()
    const [isFilter, setIsFilter] = useState(false)
    const handleCloseModalFilter = () => {
      
        onClose()
    }
 

    useEffect(() => {
        setIsFilter(type !== null ? true : false)
    }, [type])

    return (
        <FilterWrapper $active={$active} $isOpenFilter>
            <FilterArea>
                {type === 'category' && <Catagory />}
                {type === 'date' && <CalendarComponent $isFilter={isFilter} />}
                {type === 'sum' && <MoneyFilter />}

                <PrimaryButton>Выбрать</PrimaryButton>
                <PrimaryButton onClick={handleCloseModalFilter}>Закрыть</PrimaryButton>
            </FilterArea>
        </FilterWrapper>
    )
}

export default FilterModal
