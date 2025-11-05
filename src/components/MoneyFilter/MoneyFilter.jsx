import { useEffect, useState } from 'react'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import { useAppContext } from '../../contexts/AppContext'
import { useAuthContext } from '../../contexts/AuthContext'

function MoneyFilter() {
    const { activeDistaffMoney, setActiveDistaffMoney } = useAppContext()
    const { userData } = useAuthContext()

    const [minInput, setMinInput] = useState('')
    const [maxInput, setMaxInput] = useState('')
    const [value, setValue] = useState([0, 10000])
    const [maxSum, setMaxSum] = useState(10000)

    // Инициализация диапазона при первом получении данных
    useEffect(() => {
        if (userData && userData.length > 0) {
            const calculatedMax = Math.max(...userData.map((d) => d.sum), 1)
            setMaxSum(calculatedMax)

            // Устанавливаем диапазон ТОЛЬКО если он ещё не задан
            if (!activeDistaffMoney || activeDistaffMoney.length === 0) {
                const initialRange = [0, calculatedMax]
                setActiveDistaffMoney(initialRange)
                setValue(initialRange)
                setMinInput(0)
                setMaxInput(calculatedMax)
            } else {
                // Если диапазон уже задан — обновляем только локальные состояния
                setValue([activeDistaffMoney[0], activeDistaffMoney[1]])
                setMinInput(activeDistaffMoney[0])
                setMaxInput(activeDistaffMoney[1])
            }
        }
    }, [userData, activeDistaffMoney, setActiveDistaffMoney])

    // Синхронизация при изменении activeDistaffMoney извне (например, сброс фильтра)
    useEffect(() => {
        if (activeDistaffMoney && activeDistaffMoney.length === 2) {
            setValue([activeDistaffMoney[0], activeDistaffMoney[1]])
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
        const val = event.target.value
        const newMin = val === '' ? 0 : Number(val)
        if (!isNaN(newMin) && newMin >= 0 && newMin <= maxInput) {
            setMinInput(newMin)
            const newRange = [newMin, maxInput]
            setValue(newRange)
            setActiveDistaffMoney(newRange)
        }
    }

    const handleMaxInputChange = (event) => {
        const val = event.target.value
        const newMax = val === '' ? maxSum : Number(val)
        if (!isNaN(newMax) && newMax >= minInput && newMax <= maxSum) {
            setMaxInput(newMax)
            const newRange = [minInput, newMax]
            setValue(newRange)
            setActiveDistaffMoney(newRange)
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <TextField label="Мин" type="number" value={minInput} onChange={handleMinInputChange} inputProps={{ min: 0, max: maxSum, step: 1 }} variant="standard" />
                <TextField label="Макс" type="number" value={maxInput} onChange={handleMaxInputChange} inputProps={{ min: 0, max: maxSum, step: 1 }} variant="standard" />
            </div>
            <Slider value={value} onChange={handleSliderChange} valueLabelDisplay="auto" min={0} max={maxSum} step={500} sx={{ color: 'primary.main' }} />
        </div>
    )
}

export default MoneyFilter
