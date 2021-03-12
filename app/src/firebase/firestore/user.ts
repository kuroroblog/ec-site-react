import firebase from 'firebase'
import { db } from '..'

export class users {
  private db: firebase.firestore.Firestore
  private users: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>

  constructor() {
    this.db = db
    this.users = this.db.collection('users')
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
}
