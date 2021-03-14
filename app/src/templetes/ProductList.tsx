import { useEffect } from 'react'
import { ProductCard } from '../components/Products'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../reducks/products/operations'
import { getProducts } from '../reducks/products/selectors'
import { useLocation } from 'react-router-dom'

const ProductList = () => {
  const queryString = new URLSearchParams(useLocation().search)
  const gender = queryString.get('gender')
  const category = queryString.get('category')

  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const products = getProducts(selector)
  useEffect(() => {
    dispatch(
      fetchProducts({
        gender: gender,
        category: category,
      })
    )
  }, [gender, category])

  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row">
        {products.length > 0 &&
          products.map((product: any) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              images={product.images}
              price={product.price}
            />
          ))}
      </div>
    </section>
  )
}

export default ProductList
