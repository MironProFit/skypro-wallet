import React from 'react'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'

function MoneyFilter() {
    const [value, setValue] = React.useState([1000, 6000])
    const [minInput, setMinInput] = React.useState(1500)
    const [maxInput, setMaxInput] = React.useState(6000)

    const handleSliderChange = (event, newValue) => {
        setValue(newValue)
        setMinInput(newValue[0])
        setMaxInput(newValue[1])
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
