import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

function PrivatRoutes() {
    const { token } = useAuthContext()
    return token ? <Outlet /> : <Navigate to={'/login'} replace />
}

export default PrivatRoutes
