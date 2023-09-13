import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import './index.css'
import ResponsiveAppBar from "./ResponsiveAppBar.jsx";
import {AppProvider} from "./AppContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <>
          <AppProvider>
          <div className="appWrapper">
            <ResponsiveAppBar />
            <App />
          </div>
          </AppProvider>
      </>

  </React.StrictMode>,
)
