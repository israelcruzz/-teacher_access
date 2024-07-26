import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AuthRoutes } from './routes/auth-routes/auth-routes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthRoutes />
  </React.StrictMode>,
)
