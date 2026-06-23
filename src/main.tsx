import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "../i18n.ts"; 
import "./main.css"

import {registerSW} from "virtual:pwa-register"
import { HashRouter } from 'react-router';

registerSW({immediate: true})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
