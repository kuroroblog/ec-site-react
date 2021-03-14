import { useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProductsInCart } from '../reducks/users/selectors'
import { makeStyles } from '@material-ui/core/styles'
import { CartListItem } from '../components/Products'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import { PrimaryButton, TextDetail } from '../components/UIKit'
import { cartTypes } from '../reducks/users/types'
import { convertPrice } from '../util/format'
import { orderProduct } from '../reducks/products/operations'

const useStyles = makeStyles((theme) => ({
  detailBox: {
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: 320,
    },
    [theme.breakpoints.up('md')]: {
      width: 512,
    },
  },
  orderBox: {
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    boxShadow: '0 4px 2px 2px rgba(0, 0, 0, 0.2)',
    height: 256,
    margin: '24px auto 16px auto',
    padding: 16,
    width: 288,
  },
}))

const OrderConfirm = () => {
  const classes = useStyles()
  const selector = useSelector((state) => state)
  const productsInCart = getProductsInCart(selector)
  const dispatch = useDispatch()

  const subTotal = useMemo(() => {
    return productsInCart.reduce((sum: number, product: cartTypes) => (sum += product.price), 0)
  }, [productsInCart])
  const shippingFee = subTotal >= 10000 ? 0 : 210
  const tax = Math.floor(subTotal * 0.1)
  const total = subTotal + shippingFee + tax

  const order = useCallback(() => {
    dispatch(orderProduct(productsInCart, total))
  }, [productsInCart, total])

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">注文の確認</h2>
      <div className="p-grid__row">
        <div className={classes.detailBox}>
          <List>
            {productsInCart.length > 0 &&
              productsInCart.map((product: cartTypes) => <CartListItem key={product.cartId} product={product} />)}
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetail label={'商品の合計金額'} value={'¥' + convertPrice(subTotal)} />
          <TextDetail label={'消費税'} value={'¥' + convertPrice(tax)} />
          <TextDetail label={'送料'} value={'¥' + convertPrice(shippingFee)} />
          <Divider />
          <div className="module-spacer--extra-extra-small" />
          <TextDetail label={'合計(税込)'} value={'¥' + convertPrice(total)} />
          <PrimaryButton label="注文する" onClick={() => order()} />
        </div>
      </div>
    </section>
  )
}

export default OrderConfirm
