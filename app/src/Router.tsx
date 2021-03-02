import { Switch, Route } from 'react-router-dom'
import { SignUp, LogIn, Reset, Home } from './templetes'
import Auth from './Auth'

const Router = () => {
  return (
    <Switch>
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/login'} component={LogIn} />

      <Auth>
        <Route exact path={'(/password/reset)'} component={Reset} />
        <Route exact path={'(/)?'} component={Home} />
      </Auth>
    </Switch>
  )
}

export default Router
