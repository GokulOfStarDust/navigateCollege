import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LocRouteProvider from './pages/context/LocRouteProvider.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <LocRouteProvider>
      <App />
    </LocRouteProvider>
)
