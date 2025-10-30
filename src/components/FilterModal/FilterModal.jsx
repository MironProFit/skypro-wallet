import { useEffect, useState } from 'react'
import { FilterWrapper } from './FilterModal.styles'

function FilterModal({ type, onClose, $active }) {

    const handleCloseModalFilter = () => {
        console.log('кнопка нажата')
        console.log(type)
        onClose()
    }

    return (
        <FilterWrapper $active={$active} $isOpenFilter>
            <button onClick={handleCloseModalFilter}>Закрыть</button>
        </FilterWrapper>
    )
}

export default FilterModal
