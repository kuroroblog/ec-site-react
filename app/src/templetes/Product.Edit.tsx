import React, { useCallback, useEffect, useState } from 'react'
import { TextInput, SelectBox, PrimaryButton } from '../components/UIKit'
import { categories } from '../config/category'
import { genders } from '../config/gender'
import { useDispatch } from 'react-redux'
import { saveProduct } from '../reducks/products/operations'
import ImageArea from '../components/Products/Image.Area'
import { useParams } from 'react-router'
import { products } from '../firebase/firestore/product'
import { SetSizeArea } from '../components/Products'

const productsIns = new products()

const ProductEdit = () => {
  /**
   * @link https://stackoverflow.com/questions/63660520/typescript-error-after-upgrading-version-4-useparams-from-react-router-dom-pr
   */
  const params = useParams<{ id: string }>()
  const id = params.id

  const dispatch = useDispatch()

  const [category, setCategory] = useState(''),
    [description, setDescription] = useState(''),
    [gender, setGender] = useState(''),
    [images, setImages] = useState([]),
    [name, setName] = useState(''),
    [price, setPrice] = useState(''),
    [sizes, setSizes] = useState([])

  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value)
    },
    [setDescription]
  )

  const inputName = useCallback(
    (event) => {
      setName(event.target.value)
    },
    [setName]
  )

  const inputPrice = useCallback(
    (event) => {
      setPrice(event.target.value)
    },
    [setPrice]
  )

  useEffect(() => {
    if (id) {
      ;(async () => {
        const data = await productsIns.getData(id)
        if (data) {
          setCategory(data.category)
          setDescription(data.description)
          setGender(data.gender)
          setImages(data.images)
          setName(data.name)
          setPrice(data.price)
          setSizes(data.sizes)
        }
      })()
    }
  }, [id])

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true}
          label={'商品名'}
          multiline={false}
          required={true}
          onChange={inputName}
          rows={1}
          value={name}
          type={'text'}
        />
        <TextInput
          fullWidth={true}
          label={'商品説明'}
          multiline={true}
          required={true}
          onChange={inputDescription}
          rows={5}
          value={description}
          type={'text'}
        />
        <SelectBox
          label={'カテゴリー'}
          required={true}
          options={categories}
          select={setCategory}
          value={category}
        ></SelectBox>
        <SelectBox label={'性別'} required={true} options={genders} select={setGender} value={gender}></SelectBox>
        <TextInput
          fullWidth={true}
          label={'価格'}
          multiline={false}
          required={true}
          onChange={inputPrice}
          rows={1}
          value={price}
          type={'number'}
        />
        <div className="module-spacer--small" />
        <SetSizeArea sizes={sizes} setSizes={setSizes} />
        <div className="module-spacer--small" />
        <div className="center">
          <PrimaryButton
            label={'商品情報を保存'}
            onClick={() => dispatch(saveProduct(id, category, description, gender, images, name, price, sizes))}
          ></PrimaryButton>
        </div>
      </div>
    </section>
  )
}
export default ProductEdit
