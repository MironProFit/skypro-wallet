import { format } from "date-fns"
import { ru } from "date-fns/locale"

export function formattedDate(date) {
   return  format(date,' dd MMMM yyyy',{locale: ru})
}

