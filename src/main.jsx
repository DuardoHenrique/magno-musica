import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import './styles/animations.css'
import { initGA4 } from './hooks/useAnalytics'

// Check for previous consent on load
const storedConsent = localStorage.getItem('cookie_consent');
if (storedConsent === 'accepted') {
  initGA4();
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
