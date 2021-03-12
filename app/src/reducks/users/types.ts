import firebase from 'firebase'

export interface userTypes {
  isLogIn: boolean
  role: string
  uid: string
  username: string
}

export interface cartTypes {
  cartId: string
  createdAt: firebase.firestore.Timestamp
  productId: string
  quantity: number
  size: string
}
