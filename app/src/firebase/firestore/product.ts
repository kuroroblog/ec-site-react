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

  public async setData(
    data:
      | {
          id: string
          category: string
          description: string
          gender: string
          images: Array<{ id: string; path: string }>
          name: string
          price: number
          sizes: Array<{ size: string; quantity: number }>
          updatedAt: firebase.firestore.Timestamp
        }
      | {
          id: string
          category: string
          description: string
          gender: string
          images: Array<{ id: string; path: string }>
          name: string
          price: number
          sizes: Array<{ size: string; quantity: number }>
          createdAt: firebase.firestore.Timestamp
          updatedAt: firebase.firestore.Timestamp
        }
  ): Promise<void> {
    return this.products.doc(data.id).set(data, { merge: true })
  }

  public async getData(id: string): Promise<firebase.firestore.DocumentData | undefined> {
    return (await this.products.doc(id).get()).data()
  }
}
