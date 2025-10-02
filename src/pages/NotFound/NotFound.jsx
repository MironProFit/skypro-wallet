import { NavLinkButton } from '../../components/Header/Header.styles'

function NotFound() {
    return (
        <>
            <h2 >Страница не найдена</h2>
            <NavLinkButton to={'/'}>На главную</NavLinkButton>
        </>
    )
}

export default NotFound
