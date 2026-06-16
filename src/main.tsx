import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "../i18n.ts"; 
import "./main.css"

import {registerSW} from "virtual:pwa-register"
import { BrowserRouter } from 'react-router';

registerSW({immediate: true})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </StrictMode>,
)
