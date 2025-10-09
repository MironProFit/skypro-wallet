import CartSVG from '../components/SvgIcons/CategoryIcons/CartSVG'
import EducationSVG from '../components/SvgIcons/CategoryIcons/EducationSVG'
import HousingSVG from '../components/SvgIcons/CategoryIcons/HousingSVG'
import JoySVG from '../components/SvgIcons/CategoryIcons/JoySVG'
import OtherSVG from '../components/SvgIcons/CategoryIcons/OtherSVG'
import TransportSVG from '../components/SvgIcons/CategoryIcons/TransportSVG'

export const categoryList = [
    { category: 'food', color: '#d9b6ff', name: 'Еда', icon: CartSVG },
    { category: 'transport', color: '#ffb53d', name: 'Транспорт', icon: TransportSVG },
    { category: 'housing', color: '#6ee4fe', name: 'Жилье', icon: HousingSVG },
    { category: 'joy', color: '#b0aeff', name: 'Развлечения', icon: JoySVG },
    { category: 'education', color: '#bcec30', name: 'Образования', icon: EducationSVG },
    { category: 'others', color: '#ffb9b8', name: 'Другое', icon: OtherSVG },
]
