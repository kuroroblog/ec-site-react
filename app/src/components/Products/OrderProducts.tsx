import { useCallback } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import { PrimaryButton } from '../UIKit'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { convertPrice } from '../../util/format'
import { orderTypes } from '../../reducks/users/types'

const useStyles = makeStyles({
  list: {
    background: '#fff',
    height: 'auto',
  },
  image: {
    objectFit: 'cover',
    margin: '8px 16px 8px 0',
    height: 96,
    width: 96,
  },
  text: {
    width: '100%',
  },
})

const OrderProducts = (props: { products: Array<orderTypes> }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const products = props.products

  const goToProductDetail = useCallback((id: string) => {
    dispatch(push('/product/' + id))
  }, [])

  return (
    <List>
      {products.map((product: orderTypes) => (
        <>
          <ListItem className={classes.list} key={product.id}>
            <ListItemAvatar>
              <img className={classes.image} src={product.images[0].path} alt={'Ordered Product'} />
            </ListItemAvatar>
            <div className={classes.text}>
              <ListItemText primary={product.name} secondary={'サイズ : ' + product.size} />
              <ListItemText primary={product.name} secondary={'¥' + convertPrice(product.price)} />
            </div>
            <PrimaryButton label={'商品詳細を見る'} onClick={() => goToProductDetail(product.id)} />
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  )
}

export default OrderProducts
