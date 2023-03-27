import React from 'react'
import { createRoot } from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import './styles.css'
import App from './App'

const container = document.getElementById('root')
if (!container) {
  throw new Error('missing root container')
}

const root = createRoot(container)

root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <App />
    </LocalizationProvider>
  </React.StrictMode>,
)

reportWebVitals()
