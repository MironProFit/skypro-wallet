import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import LoadingModal from '../../components/Loading/LoadingModal'

function Layout() {
    
    return (
        <>
            <Header />
            <LoadingModal/>
            <Outlet />
        </>
    )
}

export default Layout
