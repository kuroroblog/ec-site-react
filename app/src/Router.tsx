import { Switch, Route } from 'react-router-dom'
import { SignUp, LogIn, Reset, Home, ProductEdit } from './templetes'
import Auth from './Auth'

const Router = () => {
  return (
    <Switch>
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/login'} component={LogIn} />
      <Route exact path={'/password/reset'} component={Reset} />
      <Auth>
        <Route exact path={'(/)?'} component={Home} />
        <Route exact path={'/product/edit'} component={ProductEdit} />
        <Route path={'/product/edit/:id(\\w+)'} component={ProductEdit} />
      </Auth>
    </Switch>
  )
}

export default Router
