export const formatNum = (number) => {
    const formatter = new Intl.NumberFormat('ru-RU', {
        style: 'decimal',
        minimumFractionDigits: 0,
    })
    return formatter.format(number)
}