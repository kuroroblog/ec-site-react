import firebase from 'firebase'
import { storage } from '..'
import { makeFile, generatedFileName } from '../../util/file'

export class images {
  private storage: firebase.storage.Storage
  private images: firebase.storage.Reference

  constructor() {
    this.storage = storage
    this.images = this.storage.ref('images')
  }

  public async getUploadRef(): Promise<any[]> {
    const filename = generatedFileName()
    return [this.images.child(filename), filename]
  }

  public async putImage(file: any): Promise<any[]> {
    const [uploadRef, filename] = await this.getUploadRef()
    const uploadTask = await uploadRef.put(makeFile(file))
    return [uploadTask, filename]
  }
}
