/*
 * @Description:
 * @Date: 2019-12-20 10:39:07
 * @LastEditTime : 2019-12-20 16:53:20
 */
import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'
import Home from './pages/Home'
function App() {
  return (
    <Router>
      <Suspense fallback={<div className="route-loading">loading...</div>}>
        <div className="App">
          <Route path="/home" component={Home} />
          <Route path="/" exact render={() => <Redirect to="/home" />} />
        </div>
      </Suspense>
    </Router>
  )
}

export default App
