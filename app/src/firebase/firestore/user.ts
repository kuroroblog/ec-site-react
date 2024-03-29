import firebase from 'firebase'
import { db } from '..'

export class users {
  private db: firebase.firestore.Firestore
  private users: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>

  constructor() {
    this.db = db
    this.users = this.db.collection('users')
  }

  public async getBatch(): Promise<firebase.firestore.WriteBatch> {
    return this.db.batch()
  }

  public async getRef(id: string): Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>> {
    return this.users.doc(id)
  }

  public async create(
    id: string,
    data: {
      customerId: string
      paymentMethodId: string
      username: string
      email: string
      role: string
      createdAt: firebase.firestore.Timestamp
      updatedAt: firebase.firestore.Timestamp
    }
  ): Promise<void> {
    return this.users.doc(id).set(data)
  }

  public async getData(id: string): Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> {
    return this.users.doc(id).get()
  }

  public async getOrders(id: string): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    return this.users.doc(id).collection('orders').orderBy('updatedAt', 'desc').get()
  }
}
