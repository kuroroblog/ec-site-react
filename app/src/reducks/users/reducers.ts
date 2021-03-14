import * as Actions from './actions'
import { initialState } from '../store/initialState'

export const UsersReducer = (state = initialState.users, action: any): any => {
  switch (action.type) {
    case Actions.LOG_IN:
      return {
        ...state,
        ...action.payload,
      }
    case Actions.FETCH_PRODUCTS_IN_CART:
      return {
        ...state,
        cart: [...action.payload],
      }
    case Actions.LOG_OUT:
      return {
        ...initialState.users,
      }
    case Actions.FETCH_ORDERS_HISTORY:
      return {
        ...state,
        orders: [...action.payload],
      }
    default:
      return state
  }
}
