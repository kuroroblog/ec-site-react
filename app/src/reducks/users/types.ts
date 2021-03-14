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
  images: Array<{ id: string; path: string }>
  name: string
  price: number
  productId: string
  quantity: number
  size: string
}

export interface orderTypes {
  id: string
  images: Array<{ id: string; path: string }>
  name: string
  price: number
  size: string
}
