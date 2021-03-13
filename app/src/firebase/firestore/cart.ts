import firebase from 'firebase'
import { db } from '..'

export class cart {
  private db: firebase.firestore.Firestore
  private cart: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>

  constructor(uid: string) {
    this.db = db
    this.cart = this.db.collection('users').doc(uid).collection('cart')
  }

  public async getCart(): Promise<firebase.firestore.CollectionReference<firebase.firestore.DocumentData>> {
    return this.cart
  }

  public async getAutoDocId(): Promise<string> {
    return this.cart.doc().id
  }

  public async setData(data: {
    cartId: string
    createdAt: firebase.firestore.Timestamp
    productId: string
    quantity: number
    size: string
  }): Promise<void> {
    return this.cart.doc(data.cartId).set(data, { merge: true })
  }

  public async delete(id: string): Promise<void> {
    return this.cart.doc(id).delete()
  }
}
