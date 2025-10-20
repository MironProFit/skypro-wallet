import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom'
import PrivatRoutes from './PrivatRoutes'
import Layout from '../pages/Layout/Layout'
import AuthModal from '../components/Auth/AuthModal'
import NotFound from '../components/NotFound/NotFound'
import Expenses from '../pages/Expenses/ExpensesPage'
import Analysis from '../pages/AnalysisPage/AnalysisPage'

function AppRoutes() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    element: <PrivatRoutes />,
                    children: [
                        { index: true, element: <Expenses /> },
                        { path: 'expenses', element: <Expenses /> },
                        { path: 'newexpenses', element: <Expenses /> },
                        { path: 'analysis', element: <Analysis /> },
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
