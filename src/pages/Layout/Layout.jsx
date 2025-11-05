import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import LoadingModal from '../../components/Loading/LoadingModal'

function Layout({ onLogout }) {
    return (
        <>
            <Header onLogout={onLogout} />
            <LoadingModal />
            <Outlet />
        </>
    )
}

export default Layout
