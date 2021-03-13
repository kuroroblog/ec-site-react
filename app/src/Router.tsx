import { Switch, Route } from 'react-router-dom'
import { CartList, ProductList, SignUp, LogIn, Reset, ProductEdit, ProductDetail, OrderConfirm } from './templetes'
import Auth from './Auth'

const Router = () => {
  return (
    <Switch>
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/login'} component={LogIn} />
      <Route exact path={'/password/reset'} component={Reset} />
      <Auth>
        <Switch>
          <Route exact path={'(/)?'} component={ProductList} />
          <Route exact path={'/product/edit'} component={ProductEdit} />
          <Route path={'/product/edit/:id(\\w+)'} component={ProductEdit} />
          <Route path={'/product/:id(\\w+)'} component={ProductDetail} />
          <Route exact path={'/cart'} component={CartList} />
          <Route exact path={'/order/confirm'} component={OrderConfirm} />
        </Switch>
      </Auth>
    </Switch>
  )
}

export default Router
