import { userTypes } from './types'

export const EDIT_USER_PROFILE = 'EDIT_USER_PROFILE'
export const editProfileStateAction = (
  userProfile: any
): {
  type: string
  payload: any
} => {
  return {
    type: EDIT_USER_PROFILE,
    payload: userProfile,
  }
}

export const FETCH_ORDERS_HISTORY = 'FETCH_ORDERS_HISTORY'
export const fetchOrdersHistoryAction = (
  orders: any
): {
  type: string
  payload: any
} => {
  return {
    type: FETCH_ORDERS_HISTORY,
    payload: orders,
  }
}

export const FETCH_PRODUCTS_IN_CART = 'FETCH_PRODUCTS_IN_CART'
export const fetchProductsInCartAction = (
  products: any
): {
  type: string
  payload: any
} => {
  return {
    type: FETCH_PRODUCTS_IN_CART,
    payload: products,
  }
}

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

export const UPDATE_USER_STATE = 'UPDATE_USER_STATE'
export const updateUserStateAction = (
  userState: any
): {
  type: string
  payload: any
} => {
  return {
    type: UPDATE_USER_STATE,
    payload: userState,
  }
}
