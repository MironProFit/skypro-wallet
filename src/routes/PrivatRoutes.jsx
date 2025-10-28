import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

function PrivatRoutes() {
    
    const { isAuth } = useAuthContext()
    return isAuth ? <Outlet /> : <Navigate to={'/login'} replace />
}

export default PrivatRoutes
