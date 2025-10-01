import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import PrivatRoutes from './PrivatRoutes'
import MainWithModal from '../components/Layout/MainWithModal'

function AppRoutes() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    element: <PrivatRoutes />,
                    children: [{ path: '', element: <MainWithModal /> }],
                },
            ],
        },
    ])
    return <RouterProvider router={router} />
}

export default AppRoutes
