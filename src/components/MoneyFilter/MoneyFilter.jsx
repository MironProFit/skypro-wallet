import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import { useAppContext } from '../../contexts/AppContext'
import { useAuthContext } from '../../contexts/AuthContext'

function MoneyFilter() {
    const { activeDistaffMoney, setActiveDistaffMoney } = useAppContext()
    const { userData } = useAuthContext()

    const [minInput, setMinInput] = useState('')
    const [maxInput, setMaxInput] = useState('')
    const [maxSum, setMaxSum] = useState(10000)

    // Инициализация maxSum при получении userData
    useEffect(() => {
        if (userData && userData.length > 0) {
            const calculatedMax = Math.max(...userData.map((d) => d.sum), 1)
            setMaxSum(calculatedMax)

            // Если activeDistaffMoney уже установлен (после применения фильтра), восстанавливаем значения
            if (activeDistaffMoney && activeDistaffMoney.length === 2) {
                setMinInput(activeDistaffMoney[0])
                setMaxInput(activeDistaffMoney[1])
            }
        }
    }, [userData, activeDistaffMoney])

    // Обработчики
    const handleMinInputChange = (event) => {
        const val = event.target.value
        const newMin = val === '' ? 0 : Number(val)
        if (!isNaN(newMin) && newMin >= 0) {
            setMinInput(newMin)
            // Обновляем activeDistaffMoney, только если maxInput тоже валиден
            if (maxInput !== '' && !isNaN(Number(maxInput))) {
                setActiveDistaffMoney([newMin, Number(maxInput)])
            }
        }
    }

    const handleMaxInputChange = (event) => {
        const val = event.target.value
        const newMax = val === '' ? maxSum : Number(val)
        if (!isNaN(newMax) && newMax >= minInput && newMax <= maxSum) {
            setMaxInput(newMax)
            // Обновляем activeDistaffMoney, только если minInput тоже валиден
            if (minInput !== '' && !isNaN(Number(minInput))) {
                setActiveDistaffMoney([Number(minInput), newMax])
            }
        }
    }

    return <></>
}

export default MoneyFilter
