import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Landing from './Landing.jsx'
import { BrowserRouter as Router, Routes as Switch, Route, } from "react-router-dom"
import { AuthProvider } from './context/auth.jsx'
import PrivateRoute from './context/PrivateRoute.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Router>

      <AuthProvider>


        <Switch>

                <Route path="/" element={<Landing />} />

                <Route path='/home' element={<PrivateRoute/>}>
                      <Route exact path='/home' element={<App/>}/>
                </Route>  

          </Switch>          
              

      </AuthProvider> 

    </Router>

  </React.StrictMode>,
)
