import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { NewsFeedProvider } from './contexts/NewsFeedContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <NewsFeedProvider>
        <App />
      </NewsFeedProvider>
    </AuthProvider>
  </React.StrictMode>
)
