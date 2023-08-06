import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

if (!navigator.geolocation) {
   alert('Please add a geolocation')
   throw new Error('Please add a geolocation')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
   // <React.StrictMode>
   <App />
   // </React.StrictMode>
)
