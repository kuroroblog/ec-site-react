import React, { useCallback, useState } from 'react'
import { TextInput, SelectBox } from '../components/UIKit'
import { categories } from '../config/category'
import { genders } from '../config/gender'

const ProductEdit = () => {
  const [name, setName] = useState(''),
    [category, setCategory] = useState(''),
    [gender, setGender] = useState(''),
    [price, setPrice] = useState(''),
    [description, setDescription] = useState('')

  const inputName = useCallback(
    (event) => {
      setName(event.target.value)
    },
    [setName]
  )

  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value)
    },
    [setDescription]
  )

  const inputPrice = useCallback(
    (event) => {
      setPrice(event.target.value)
    },
    [setPrice]
  )

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
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
      </div>
      <div className="module-spacer--medium" />
      <div className="center">{/* <PrimaryButton label={'商品情報を保存'} onClick={}></PrimaryButton> */}</div>
    </section>
  )
}
export default ProductEdit
