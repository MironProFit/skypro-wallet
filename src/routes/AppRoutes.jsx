import { createBrowserRouter, Navigate, RouterProvider, useLocation } from 'react-router-dom'
import PrivatRoutes from './PrivatRoutes'
import Layout from '../pages/Layout/Layout'
import AuthModal from '../components/Auth/AuthModal'

import NotFound from '../components/NotFound/NotFound'
import { useAppContext } from '../contexts/AppContext'
import ExpensesPage from '../pages/Expenses/ExpensesPage'
import PeriodPage from '../pages/PeriodPage/PeriodPage'
import NewExpensePage from '../pages/NewExpensePage/NewExpensePage'
import AnalysisPage from '../pages/AnalysisPage/AnalysisPage'

function AppRoutes() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
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
                { path: 'login', element: <AuthModal /> },
                { path: 'register', element: <AuthModal /> },
                { path: '*', element: <NotFound /> },
            ],
        },
    ])
    return <RouterProvider router={router} />
}

export default AppRoutes
