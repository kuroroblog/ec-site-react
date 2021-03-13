import IconButton from '@material-ui/core/IconButton'
import { useCallback } from 'react'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import { makeStyles } from '@material-ui/styles'
import { images } from '../../firebase/storage/image'
import ImagePreview from './ImagePreview'

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48,
  },
})

const imagesIns = new images()

const ImageArea = (props: { images: Array<{ id: string; path: string }>; setImages: any }) => {
  const classes = useStyles()
  const images = props.images

  const uploadImage = useCallback(
    async (event) => {
      const file = event.target.files
      const [uploadTask, filename] = await imagesIns.putImage(file)
      const newImage = { id: filename, path: await uploadTask.ref.getDownloadURL() }
      props.setImages((prevState: Array<{ images: Array<{ id: string; path: string }>; setImages: any }>) => [
        ...prevState,
        newImage,
      ])
    },
    [props.setImages]
  )

  const deleteImage = useCallback(
    async (id) => {
      const res = window.confirm('本当にこの画像を削除しますか？')
      if (!res) {
        return
      }
      const newImages = images.filter((image: { id: string; path: string }) => image.id !== id)
      props.setImages(newImages)
      return imagesIns.deleteImage(id)
    },
    [images]
  )

  return (
    <div>
      <div className="p-grid__list-images">
        {images.length > 0 &&
          images.map((image) => <ImagePreview delete={deleteImage} key={image.id} path={image.path} id={image.id} />)}
      </div>
      <div className="u-text-right">
        <span>商品画像を登録する</span>
        <IconButton className={classes.icon}>
          <label>
            <AddPhotoAlternateIcon />
            <input className="u-display-none" type="file" onChange={(event) => uploadImage(event)} />
          </label>
        </IconButton>
      </div>
    </div>
  )
}

export default ImageArea
