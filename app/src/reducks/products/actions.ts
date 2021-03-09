import firebase from 'firebase'
import { productTypes } from './types'

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const fetchProductsAction = (products: Array<firebase.firestore.DocumentData>) => {
  return {
    type: FETCH_PRODUCTS,
    payload: products,
  }
}

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const deleteProductAction = (products: productTypes) => {
  return {
    type: DELETE_PRODUCT,
    payload: products,
  }
}
