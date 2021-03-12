import IconButton from '@material-ui/core/IconButton'
import { Badge } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import MenuIcon from '@material-ui/icons/Menu'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsInCart, getUserId } from '../../reducks/users/selectors'
import { cart } from '../../firebase/firestore/cart'
import { useEffect } from 'react'
import { fetchProductsInCart } from '../../reducks/users/operations'
import firebase from 'firebase'

const HeaderMenus = (props: any) => {
  const selector = useSelector((state) => state)
  const dispatch = useDispatch()
  let productsInCart = getProductsInCart(selector)
  useEffect(() => {
    const uid = getUserId(selector)
    const cartIns = new cart(uid)

    const unsubscribe = async () => {
      const thisCart = await cartIns.getCart()
      thisCart.onSnapshot((snapshots: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
        snapshots.docChanges().forEach((change: firebase.firestore.DocumentChange<firebase.firestore.DocumentData>) => {
          const product = change.doc.data()
          const changeType = change.type
          const index = productsInCart.findIndex((product: any) => product.cartId === change.doc.id)

          switch (changeType) {
            case 'added':
              productsInCart.push(product)
              break
            case 'modified':
              productsInCart[index] = product
              break
            case 'removed':
              productsInCart = productsInCart.filter((product: any) => product.cartId !== change.doc.id)
              break
            default:
              break
          }
        })

        dispatch(fetchProductsInCart(productsInCart))
      })
    }
    unsubscribe()
  }, [])

  return (
    <>
      <IconButton>
        <Badge badgeContent={productsInCart.length} color="primary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton onClick={(event) => props.handleDrawerToggle(event, true)}>
        <MenuIcon />
      </IconButton>
    </>
  )
}

export default HeaderMenus
