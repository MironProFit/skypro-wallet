import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './routes/App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { AppProvider } from './contexts/AppContext.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <AppProvider>
                <App />
            </AppProvider>
        </AuthProvider>
    </StrictMode>
)

