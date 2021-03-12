import firebase from 'firebase'

export interface userTypes {
  isLogIn: boolean
  role: string
  uid: string
  username: string
}

export interface cartTypes {
  added_at: firebase.firestore.Timestamp
  cartId: string
  productId: string
  quantity: number
  size: string
}
