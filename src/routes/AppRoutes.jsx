import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import PrivatRoutes from './PrivatRoutes'
import Expenses from '../pages/Expenses/Expenses'
import Analysis from '../pages/Analysis/Analysis'
import AuthModal from '../pages/Auth/AuthModal'
import NotFound from '../pages/NotFound/NotFound'

function AppRoutes() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    element: <PrivatRoutes />,
                    children: [
                        { index: true, element: null },
                        { path: 'expenses', element: <Expenses /> },
                        { path: 'analysis', element: <Analysis /> },
                    ],
                },
                { path: 'logout', element: <AuthModal /> },
                { path: 'register', element: <AuthModal /> },
                { path: '*', element: <NotFound /> },
            ],
        },
    ])
    return <RouterProvider router={router} />
}

export default AppRoutes
