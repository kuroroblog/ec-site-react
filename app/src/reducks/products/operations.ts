import { push } from 'connected-react-router'
import { products } from '../../firebase/firestore/product'
import { firebaseTimestamp } from '../../firebase/index'
import {
  isValidRequiredInput,
  descriptionMaxLength,
  isValidTextCnt,
  isValidImageInput,
  isValidSizeInput,
  isValidPriceInput,
} from '../../util/form'
import { fetchProductsAction, deleteProductAction } from './actions'
import firebase from 'firebase'
import { productTypes } from './types'

const productsIns = new products()

export const saveProduct = (product: productTypes) => {
  return async (dispatch: any) => {
    // validations
    if (!isValidRequiredInput(product.name, product.description, product.category, product.gender, product.price)) {
      alert('必須項目が未入力です。')
      return false
    }

    if (!isValidImageInput(product.images)) {
      alert('画像がアップロードされていません。')
      return false
    }

    if (!isValidSizeInput(product.sizes)) {
      alert('サイズが登録されていません。')
      return false
    }

    if (!isValidTextCnt(product.description, descriptionMaxLength)) {
      alert('説明文の文字数が' + descriptionMaxLength + '文字以上でありません。')
      return false
    }

    const price = parseInt(product.price, 10)
    if (!isValidPriceInput(price)) {
      alert('値段が0円より大きな値段で入力されていません。')
      return false
    }

    const timestamp = firebaseTimestamp.now()
    await productsIns
      .setData(
        product.id
          ? {
              id: product.id,
              category: product.category,
              description: product.description,
              gender: product.gender,
              images: product.images,
              name: product.name,
              price: price,
              sizes: product.sizes,
              updatedAt: timestamp,
            }
          : {
              id: await productsIns.getAutoDocId(),
              category: product.category,
              description: product.description,
              gender: product.gender,
              images: product.images,
              name: product.name,
              price: price,
              sizes: product.sizes,
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

export const fetchProducts = () => {
  return async (dispatch: any) => {
    const productList: Array<firebase.firestore.DocumentData> = []
    const snapshots = await productsIns.getList()
    snapshots.forEach((snapshot) => {
      const product = snapshot.data()
      productList.push(product)
    })
    dispatch(fetchProductsAction(productList))
  }
}

export const deleteProduct = (id: string) => {
  return async (dispatch: any, getState: any) => {
    await productsIns.delete(id)

    const prevProducts = getState().products.list
    const newProducts = prevProducts.filter((product: productTypes) => product.id !== id)
    dispatch(deleteProductAction(newProducts))
    dispatch(push('/'))
  }
}
