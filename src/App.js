/*
 * @Description:
 * @Date: 2019-12-20 10:39:07
 * @LastEditTime : 2019-12-23 11:24:02
 */
import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home'
const Citylist = lazy(() => import('./pages/Citylist'))
function App() {
  return (
    <Router>
      <Suspense fallback={<div className="route-loading"> loading... </div>}>
        {' '}
        <div className="App">
          <Route path="/home" component={Home} />{' '}
          <Route path="/" exact render={() => <Redirect to="/home" />} />{' '}
          <Route path="/citylist" component={Citylist} />{' '}
        </div>{' '}
      </Suspense>{' '}
    </Router>
  )
}

export default App
