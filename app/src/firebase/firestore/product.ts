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

  public async getRef(id: string): Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>> {
    return this.products.doc(id)
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

  public async getList(whereObj: {
    gender: string | null
    category: string | null
  }): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    let query = this.products.orderBy('updatedAt', 'desc')
    const whereArray = Object.entries(whereObj)
    for (let i = 0; i < whereArray.length; i++) {
      if (whereArray[i][1] !== '') {
        query = query.where(whereArray[i][0], '==', whereArray[i][1])
      }
    }
    return query.get()
  }

  public async delete(id: string): Promise<void> {
    return this.products.doc(id).delete()
  }
}
