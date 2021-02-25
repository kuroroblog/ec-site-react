import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { SignUp } from './templetes'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'(/)?'} component={SignUp} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
