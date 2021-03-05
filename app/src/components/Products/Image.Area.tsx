import IconButton from '@material-ui/core/IconButton'
import React, { useCallback } from 'react'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import { makeStyles } from '@material-ui/styles'
import { images } from '../../firebase/storage/image'

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48,
  },
})

const ImageArea = (props: { images: Array<string>; setImages: any }) => {
  const classes = useStyles()

  const uploadImage = useCallback(
    async (event) => {
      const file = event.target.files
      const imagesIns = new images()
      const [uploadTask, filename] = await imagesIns.putImage(file)
      const newImage = { id: filename, path: await uploadTask.ref.getDownloadURL() }
      props.setImages((prevState: Array<{ images: Array<string>; setImages: any }>) => [...prevState, newImage])
    },
    [props.setImages]
  )

  return (
    <div>
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
