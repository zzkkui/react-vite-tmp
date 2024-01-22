import React from 'react'
import { createRoot } from 'react-dom/client'
import { ClickToComponent } from 'click-to-react-component'
import 'normalize.css/normalize.css'
import App from './App'

const root = createRoot(document.getElementById('root')!)

root.render(
  <>
    <ClickToComponent editor="vscode-insiders" />
    <App />
  </>,
)
