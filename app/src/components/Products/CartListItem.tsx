import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import { makeStyles } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import { getUserId } from '../../reducks/users/selectors'
import { convertPrice } from '../../util/format'
import { useSelector } from 'react-redux'
import { cart } from '../../firebase/firestore/cart'
import { cartTypes } from '../../reducks/users/types'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles({
  list: {
    height: 128,
  },
  image: {
    objectFit: 'cover',
    margin: 16,
    height: 96,
    width: 96,
  },
  text: {
    width: '100%',
  },
})

const CartListItem = (props: { product: cartTypes }) => {
  const classes = useStyles()
  const selector = useSelector((state) => state)
  const userId = getUserId(selector)

  const name = props.product.name
  const image = props.product.images[0].path
  const price = convertPrice(props.product.price)
  const size = props.product.size

  const removeProductFromCart = async (id: string) => {
    const cartIns = new cart(userId)
    await cartIns.delete(id)
  }

  return (
    <>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <img className={classes.image} src={image} alt="商品画像" />
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText primary={name} secondary={'サイズ:' + size} />
          <ListItemText primary={'¥' + price} />
        </div>
        <IconButton onClick={() => removeProductFromCart(props.product.cartId)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  )
}

export default CartListItem
