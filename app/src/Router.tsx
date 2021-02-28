import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { SignUp } from './templetes'

const Router = () => {
  return (
    <Switch>
      <Route exact path={'(/)?'} component={SignUp} />
    </Switch>
  )
}

export default Router
