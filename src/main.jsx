import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SensorManagerProvider } from './SensorManagerContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SensorManagerProvider>
      <App />
    </SensorManagerProvider>
  </React.StrictMode>,
)
