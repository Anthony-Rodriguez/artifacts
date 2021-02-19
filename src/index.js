import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import './fonts/DancingScript-VariableFont_wght.ttf'

import App from './App'
import { HashRouter } from 'react-router-dom'

const appJsx = (
  <HashRouter>
    <App />
  </HashRouter>
)

ReactDOM.render(appJsx, document.getElementById('root'))
