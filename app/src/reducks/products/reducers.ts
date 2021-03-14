import * as Actions from './actions'
import { initialState } from '../store/initialState'

export const ProductsReducer = (
  state: {
    list: never[]
  } = initialState.products,
  action: any
): any => {
  switch (action.type) {
    case Actions.FETCH_PRODUCTS:
    case Actions.DELETE_PRODUCT:
      return {
        ...state,
        list: [...action.payload],
      }
    default:
      return state
  }
}
