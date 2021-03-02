import { Switch, Route } from 'react-router-dom'
import { SignUp, LogIn } from './templetes'

const Router = () => {
  return (
    <Switch>
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/login'} component={LogIn} />
    </Switch>
  )
}

export default Router
