import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import NoImage from '../../assets/img/no_image.png'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MOreVertIcon from '@material-ui/icons/MoreVert'
import { useState } from 'react'
import { deleteProduct } from '../../reducks/products/operations'
import { convertPrice } from '../../util/format'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: 8,
      width: 'calc(50% - 16px)',
    },
    [theme.breakpoints.up('sm')]: {
      margin: 16,
      width: 'calc(33.33% - 32px)',
    },
  },
  content: {
    display: 'flex',
    padding: '16px 8px',
    textAlign: 'left',
    '&:last-child': {
      paddingBottom: 16,
    },
  },
  media: {
    height: 0,
    paddingTop: '100%',
  },
  price: {
    fontsize: 16,
    color: theme.palette.secondary.main,
  },
}))

const ProductCard = (props: {
  key: string
  id: string
  name: string
  images: Array<{ id: string; path: string }>
  price: number
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const price = convertPrice(props.price)
  const images = props.images.length > 0 ? props.images[0].path : NoImage

  return (
    <Card className={classes.root}>
      <CardMedia
        image={images}
        className={classes.media}
        title={props.name + 'に関する商品画像'}
        onClick={() => dispatch(push('/product/' + props.id))}
      />
      <CardContent className={classes.content}>
        <div onClick={() => dispatch(push('/product/' + props.id))}>
          <Typography color="textSecondary" component="p">
            {props.name}
          </Typography>
          <Typography component="p" className={classes.price}>
            ¥{price}
          </Typography>
        </div>
        <IconButton onClick={handleClick}>
          <MOreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              dispatch(push('/product/edit/' + props.id))
              handleClose
            }}
          >
            編集する
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(deleteProduct(props.id))
              handleClose
            }}
          >
            削除する
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  )
}

export default ProductCard
