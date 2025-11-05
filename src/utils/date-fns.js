import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export function formattedDate(date) {
    return format(date, 'dd.MM.yyyy', { locale: ru })
}
export function formattedDateForApi(date) {
    return format(date, 'yyyy-MM-dd', { locale: ru })
}
