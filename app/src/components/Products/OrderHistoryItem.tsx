import Divider from '@material-ui/core/Divider'
import { TextDetail } from '../UIKit'
import { convertPrice } from '../../util/format'
import firebase from 'firebase'
import { orderTypes } from '../../reducks/users/types'
import { OrderProducts } from '../../components/Products'

const datetimeToString = (date: Date): string => {
  return (
    date.getFullYear() +
    '-' +
    ('00' + String(date.getMonth() + 1).slice(-2)) +
    '-' +
    ('00' + String(date.getDate()).slice(-2)) +
    ' ' +
    ('00' + String(date.getHours()).slice(-2)) +
    ':' +
    ('00' + String(date.getMinutes()).slice(-2)) +
    ':' +
    ('00' + String(date.getSeconds()).slice(-2))
  )
}

const dateToString = (date: Date): string => {
  return (
    date.getFullYear() +
    '-' +
    ('00' + String(date.getMonth() + 1).slice(-2)) +
    '-' +
    ('00' + String(date.getDate()).slice(-2))
  )
}

const OrderHistoryItem = (props: {
  order: {
    amount: number
    createdAt: firebase.firestore.Timestamp
    id: string
    products: Array<orderTypes>
    shippingDate: firebase.firestore.Timestamp
    updatedAt: firebase.firestore.Timestamp
  }
}) => {
  const order = props.order
  const orderedDate = datetimeToString(order.updatedAt.toDate())
  const shippingDate = dateToString(order.shippingDate.toDate())
  const price = '¥' + convertPrice(order.amount)
  return (
    <div>
      <div className="module-spacer--small" />
      <TextDetail label={'注文ID'} value={order.id} />
      <TextDetail label={'注文日時'} value={orderedDate} />
      <TextDetail label={'発送予定日'} value={shippingDate} />
      <TextDetail label={'注文金額'} value={price} />
      {order.products.length > 0 && <OrderProducts products={order.products} />}
      <div className="module-spacer--extra-extra-small" />
      <Divider />
    </div>
  )
}

export default OrderHistoryItem
