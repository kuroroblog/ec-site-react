import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core'
import { getOrdersHistory } from '../reducks/users/selectors'
import { fetchOrdersHistory } from '../reducks/users/operations'
import { OrderHistoryItem } from '../components/Products'
import firebase from 'firebase'
import { orderTypes } from '../reducks/users/types'

const useStyles = makeStyles((theme) =>
  createStyles({
    orderList: {
      background: theme.palette.grey['100'],
      margin: '0 auto',
      padding: 32,
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
      [theme.breakpoints.up('md')]: {
        width: 768,
      },
    },
  })
)

const OrderHistory = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const orders = getOrdersHistory(selector)

  useEffect(() => {
    dispatch(fetchOrdersHistory())
  }, [])

  return (
    <section className="c-section-wrapin">
      <List className={classes.orderList}>
        {orders.length > 0 &&
          orders.map(
            (order: {
              amount: number
              createdAt: firebase.firestore.Timestamp
              id: string
              products: Array<orderTypes>
              shippingDate: firebase.firestore.Timestamp
              updatedAt: firebase.firestore.Timestamp
            }) => <OrderHistoryItem key={order.id} order={order} />
          )}
      </List>
    </section>
  )
}

export default OrderHistory
