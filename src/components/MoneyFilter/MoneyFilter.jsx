import { useEffect, useState } from 'react'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import { useAppContext } from '../../contexts/AppContext'

function MoneyFilter() {
    const { activeDistaffMoney, setActiveDistaffMoney } = useAppContext()
    const [minInput, setMinInput] = useState('')
    const [maxInput, setMaxInput] = useState('')
    const [value, setValue] = useState(() => {
        if (activeDistaffMoney && activeDistaffMoney.length > 0) {
            return [activeDistaffMoney[0] === 0 ? 1000 : activeDistaffMoney[0], 6000]
        }
        return [0, 6000]
    })

    useEffect(() => {
        if (activeDistaffMoney && activeDistaffMoney.length >= 2) {
            setValue([activeDistaffMoney[0] === 0 ? 1000 : activeDistaffMoney[0], activeDistaffMoney[1]])
        }
    }, [activeDistaffMoney])

    useEffect(() => {
        if (activeDistaffMoney && activeDistaffMoney.length >= 2) {
            setMinInput(activeDistaffMoney[0])
            setMaxInput(activeDistaffMoney[1])
        }
    }, [activeDistaffMoney])

    const handleSliderChange = (event, newValue) => {
        setValue(newValue)
        setMinInput(newValue[0])
        setMaxInput(newValue[1])
        setActiveDistaffMoney(newValue)
    }

    const handleMinInputChange = (event) => {
        const newMin = Number(event.target.value)
        if (newMin <= maxInput && newMin >= 0) {
            setMinInput(newMin)
            setValue([newMin, maxInput])
        }
    }

    const handleMaxInputChange = (event) => {
        const newMax = Number(event.target.value)
        if (newMax >= minInput && newMax <= 10000) {
            setMaxInput(newMax)
            setValue([minInput, newMax])
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <TextField style={{ color: 'red' }} label="Мин" type="number" value={minInput} onChange={handleMinInputChange} inputProps={{ min: 0, max: maxInput }} />
                <TextField style={{ color: 'red' }} label="Макс" type="number" value={maxInput} onChange={handleMaxInputChange} inputProps={{ min: minInput, max: 10000 }} />
            </div>

            {/* Слайдер */}
            <Slider value={value} onChange={handleSliderChange} valueLabelDisplay="auto" min={0} max={10000} step={500} />
        </div>
    )
}

export default MoneyFilter
