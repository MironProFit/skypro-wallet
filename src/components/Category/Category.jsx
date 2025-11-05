import { useAppContext } from '../../contexts/AppContext'
import { categoryList } from '../../data/CategoryList'
import { accentColor, secondaryColor, textColor } from '../../styles/Mexins.style'
import { CategoryWrap, CategoryButton, CategoryContainer, CategoryImg, CategoryDesc } from '../Expenses/Expenses.styles'

function Category({ mode = 'multi', onCategory, selectedCategory }) {
    const { activeCategories, setActiveCategories } = useAppContext()

    const checkActive = (category) => {
        if (mode === 'single') {
            return selectedCategory === category
        }
        return Array.isArray(activeCategories) && activeCategories.includes(category)
    }

    const handleCategoryClick = (category) => {
        if (mode === 'single') {
            onCategory(category)
        } else {
            setActiveCategories((prev) => {
                const current = Array.isArray(prev) ? prev : []
                if (current.includes(category)) {
                    return current.filter((item) => item !== category)
                } else {
                    return [...current, category]
                }
            })
        }
        onCategory?.(category)
    }

    return (
        <CategoryWrap>
            {categoryList.map((category) => {
                const IconComponent = category.icon
                const active = checkActive(category.category)
                return (
                    <CategoryButton key={category.category} onClick={() => handleCategoryClick(category.category)}>
                        <CategoryContainer $active={active ? 'rgba(115, 52, 234, 0.1)' : secondaryColor}>
                            <CategoryImg>
                                <IconComponent $active={active ? accentColor : textColor} />
                            </CategoryImg>
                            <CategoryDesc $active={active ? accentColor : textColor}>{category.name}</CategoryDesc>
                        </CategoryContainer>
                    </CategoryButton>
                )
            })}
        </CategoryWrap>
    )
}

export default Category
