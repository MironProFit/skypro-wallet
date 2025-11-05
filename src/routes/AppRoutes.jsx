import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import PrivatRoutes from './PrivatRoutes'
import Layout from '../pages/Layout/Layout'
import AuthModal from '../components/Auth/AuthModal'
import NotFound from '../components/NotFound/NotFound'
import ExpensesPage from '../pages/Expenses/ExpensesPage'
import PeriodPage from '../pages/PeriodPage/PeriodPage'
import NewExpensePage from '../pages/NewExpensePage/NewExpensePage'
import AnalysisPage from '../pages/AnalysisPage/AnalysisPage'
import Toastify from '../components/Toasty/Toastify'
import ConfirmExit from '../components/Confirm/ConfirmExit/ConfirmExit'
import { useMemo, useState } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { useAppContext } from '../contexts/AppContext'

function AppRoutes() {
    const [showConfirmExit, setShowConfirmExit] = useState(false)
    const { token, setToken, setUserName } = useAuthContext()
    const { showToast } = useAppContext()

    const handleLogoutClick = () => {
        setShowConfirmExit(true)
    }

    const handleConfirmExit = () => {
        // Очистка данных авторизации
        setToken('')
        setUserName('')
        // Модальное закрываем
        setShowConfirmExit(false)
        showToast('Успешный выход из аккаунта', 'info')
    }

    const handleCloseModal = () => {
        setShowConfirmExit(false)
    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout onLogout={handleLogoutClick} />,
            children: [
                {
                    element: <PrivatRoutes />,
                    children: [
                        { index: true, element: <Navigate to="/expenses" replace /> },
                        { path: 'expenses', element: <ExpensesPage /> },
                        { path: 'analysis', element: <AnalysisPage /> },
                        { path: 'expenses/new', element: <NewExpensePage /> },
                        { path: 'analysis/period', element: <PeriodPage /> },
                    ],
                },
                {
                    path: 'login',
                    element: token ? <Navigate to="/expenses" replace /> : <AuthModal />,
                },
                {
                    path: 'register',
                    element: token ? <Navigate to="/expenses" replace /> : <AuthModal />,
                },
                { path: '*', element: <NotFound /> },
            ],
        },
    ])
    return (
        <>
            <RouterProvider router={router} />
            <Toastify />
            {showConfirmExit && <ConfirmExit $showConfirmExit={showConfirmExit} onClose={handleCloseModal} onConfirm={handleConfirmExit} />}
        </>
    )
}

export default AppRoutes
