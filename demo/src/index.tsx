import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { LocalizationProvider } from '@mui/lab/'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <App />
    </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()
