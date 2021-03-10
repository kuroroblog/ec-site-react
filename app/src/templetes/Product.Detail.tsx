import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { products } from '../firebase/firestore/product'
import { makeStyles } from '@material-ui/core/styles'
import { returnCodeToBr, covertPrice } from '../util/format'
import { ImageSwiper, SizeTable } from '../components/Products'

const productsIns = new products()

const ProductDetail = () => {
  /**
   * @link https://stackoverflow.com/questions/63660520/typescript-error-after-upgrading-version-4-useparams-from-react-router-dom-pr
   */
  const params = useParams<{ id: string }>()
  const id = params.id

  const useStyles = makeStyles((theme) => ({
    sliderBox: {
      [theme.breakpoints.down('sm')]: {
        margin: '0 auto 24px auto',
        height: 320,
        width: 320,
      },
      [theme.breakpoints.up('sm')]: {
        margin: '0 auto',
        height: 400,
        width: 400,
      },
    },
    detail: {
      textAlign: 'left',
      [theme.breakpoints.down('sm')]: {
        margin: '0 auto 16px auto',
        height: 'auto',
        width: 320,
      },
      [theme.breakpoints.up('sm')]: {
        margin: '0 auto',
        height: 'auto',
        width: 400,
      },
    },
    price: {
      fontSize: 36,
    },
  }))

  const [product, setProduct] = useState({
    id: '',
    category: '',
    description: '',
    gender: '',
    images: [],
    name: '',
    price: 0,
    sizes: [],
  })

  useEffect(() => {
    const getProduct = async () => {
      const data = await productsIns.getData(id)
      if (data) {
        setProduct({
          id: data.id,
          category: data.category,
          description: data.description,
          gender: data.gender,
          images: data.images,
          name: data.name,
          price: data.price,
          sizes: data.sizes,
        })
      }
    }
    getProduct()
  }, [])

  const classes = useStyles()

  return (
    <section className="c-section-wrapin">
      {product.id && (
        <div className="p-grid__row">
          <div className={classes.sliderBox}>
            <ImageSwiper images={product.images} />
          </div>
          <div className={classes.detail}>
            <h2 className="u-text__headline">{product.name}</h2>
            <p className={classes.price}>{covertPrice(product.price)}</p>
            <div className="module-spacer--small" />
            <SizeTable sizes={product.sizes} />
            <div className="module-spacer--small" />
            <p>{returnCodeToBr(product.description)}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductDetail
