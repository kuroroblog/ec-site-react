import firebase from 'firebase'
import { db } from '..'

export class products {
  private db: firebase.firestore.Firestore
  private products: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>

  constructor() {
    this.db = db
    this.products = this.db.collection('products')
  }

  public async getAutoDocId(): Promise<string> {
    return this.products.doc().id
  }

  public async setData(data: {
    id: string
    category: string
    description: string
    gender: string
    name: string
    price: number
    createdAt: firebase.firestore.Timestamp
    updatedAt: firebase.firestore.Timestamp
    images: Array<{ id: string; path: string }>
  }): Promise<void> {
    return this.products.doc(data.id).set(data)
  }
}
