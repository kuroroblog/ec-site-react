import { push } from 'connected-react-router'
import { products } from '../../firebase/firestore/product'
import { firebaseTimestamp } from '../../firebase/index'
import {
  isValidRequiredInput,
  descriptionMaxLength,
  isValidTextCnt,
  isValidImageInput,
  isValidSizeInput,
} from '../../util/form'

const productsIns = new products()

export const saveProduct = (
  id: string,
  category: string,
  description: string,
  gender: string,
  images: Array<{ id: string; path: string }>,
  name: string,
  price: string,
  sizes: Array<{ size: string; quantity: number }>
) => {
  return async (dispatch: any) => {
    // validations
    if (!isValidRequiredInput(name, description, category, gender, price)) {
      alert('必須項目が未入力です。')
      return false
    }

    if (!isValidImageInput(images)) {
      alert('画像がアップロードされていません。')
      return false
    }

    if (!isValidSizeInput(sizes)) {
      alert('サイズが登録されていません。')
      return false
    }

    if (!isValidTextCnt(description, descriptionMaxLength)) {
      alert('説明文の文字数が' + descriptionMaxLength + '文字以上でありません。')
      return false
    }

    const timestamp = firebaseTimestamp.now()
    await productsIns
      .setData(
        id
          ? {
              id: id,
              category: category,
              description: description,
              gender: gender,
              images: images,
              name: name,
              price: parseInt(price, 10),
              sizes: sizes,
              updatedAt: timestamp,
            }
          : {
              id: await productsIns.getAutoDocId(),
              category: category,
              description: description,
              gender: gender,
              images: images,
              name: name,
              price: parseInt(price, 10),
              sizes: sizes,
              createdAt: timestamp,
              updatedAt: timestamp,
            }
      )
      .catch((error) => {
        throw new Error(error)
      })

    dispatch(push('/'))
  }
}
