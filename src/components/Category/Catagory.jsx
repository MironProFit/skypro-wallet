import { categoryList } from '../../data/CategoryList'
import { FormLabel, FormInput } from '../../styles/GlobalStyled'
import { accentColor, secondaryColor, textColor } from '../../styles/Mexins.style'
import { ExpensesFormGroup, FormInputSumWrapper, RubleIcon, FormInputSum, CategoryImg, CategoryWrap, CategoryButton, CategoryContainer, CategoryDesc } from '../Expenses/Expenses.styles'

function Catagory({ expenses, onCategory }) {
    const checkActive = (cat) => {
        return expenses?.category === cat
    }

    return (
        <CategoryWrap>
            {categoryList.map((category) => {
                const IconComponents = category.icon
                const active = checkActive(category.category)

                return (
                    <CategoryButton onClick={() => onCategory(category.category)} key={category.category}>
                        <CategoryContainer $active={active ? 'rgba(115, 52, 234, 0.1)' : secondaryColor}>
                            <CategoryImg>
                                <IconComponents $active={active ? accentColor : textColor} />
                            </CategoryImg>
                            <CategoryDesc $active={active ? accentColor : textColor}>{category.name}</CategoryDesc>
                        </CategoryContainer>
                    </CategoryButton>
                )
            })}
        </CategoryWrap>
    )
}

export default Catagory
