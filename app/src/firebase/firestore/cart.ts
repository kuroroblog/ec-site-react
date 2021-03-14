import firebase from 'firebase'
import { db } from '..'
import { cartTypes } from '../../reducks/users/types'

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

  public async setData(data: cartTypes): Promise<void> {
    return this.cart.doc(data.cartId).set(data, { merge: true })
  }

  public async delete(id: string): Promise<void> {
    return this.cart.doc(id).delete()
  }
}
