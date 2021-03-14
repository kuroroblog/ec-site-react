import { push } from 'connected-react-router'
import { users } from '../../firebase/firestore/user'
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
import { cartTypes, orderTypes } from '../../reducks/users/types'

const usersIns = new users()
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

export const orderProduct = (productsInCart: Array<cartTypes>, amount: string) => {
  return async (dispatch: any, getState: any) => {
    if (productsInCart.length <= 0) {
      return false
    }

    const id = getState().users.uid
    const userRef = await usersIns.getRef(id)
    const timestamp = firebaseTimestamp.now()

    let products: { [key: string]: orderTypes } = {},
      soldOutProducts: Array<string> = []

    const batch = await usersIns.getBatch()
    for (const product of productsInCart) {
      const data = await productsIns.getData(product.productId)
      if (!data) {
        alert('不整合なデータを取得しました。')
        return false
      }

      const sizes = data.sizes
      const updateSizes = sizes.map((size: { size: string; quantity: number }) => {
        if (size.size === product.size) {
          return {
            size: size.size,
            quantity: size.quantity - 1,
          }
        }
        if (size.quantity === 0) {
          soldOutProducts.push(product.name)
        }
        return size
      })

      products[product.productId] = {
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size,
      }
      batch.update(await productsIns.getRef(product.productId), { sizes: updateSizes })
      batch.delete(userRef.collection('cart').doc(product.cartId))
    }

    if (soldOutProducts.length > 0) {
      const errMsg = soldOutProducts.length > 1 ? soldOutProducts.join('と') : soldOutProducts[0]
      alert('大変申し訳ございません。' + errMsg + 'が在庫切れとなったため、注文処理を中断しました。')
      return false
    } else {
      const date = timestamp.toDate()
      const shippingDate = firebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 3)))

      const orderRef = userRef.collection('orders').doc()
      batch.set(
        orderRef,
        {
          amount: amount,
          createdAt: timestamp,
          id: orderRef.id,
          products: products,
          shippingDate: shippingDate,
          updatedAt: timestamp,
        },
        { merge: true }
      )
      await batch.commit().catch(() => {
        alert('注文処理に失敗しました。通信環境をご確認の上、もう一度お試しください。')
        return false
      })

      dispatch(push('/order/complete'))
    }
  }
}
