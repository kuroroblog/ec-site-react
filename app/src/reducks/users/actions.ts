import { userTypes, cartTypes } from './types'

export const LOG_IN = 'LOG_IN'
export const logInAction = (
  userState: userTypes
): {
  type: string
  payload: userTypes
} => {
  return {
    type: LOG_IN,
    payload: userState,
  }
}

export const LOG_OUT = 'LOG_OUT'
export const logOutAction = (
  userState: userTypes
): {
  type: string
  payload: userTypes
} => {
  return {
    type: LOG_OUT,
    payload: userState,
  }
}

export const FETCH_PRODUCTS_IN_CART = 'FETCH_PRODUCTS_IN_CART'
export const fetchProductsInCartAction = (
  products: [cartTypes]
): {
  type: string
  payload: [cartTypes]
} => {
  return {
    type: FETCH_PRODUCTS_IN_CART,
    payload: products,
  }
}
