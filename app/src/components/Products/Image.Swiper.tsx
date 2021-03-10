import Swiper from 'react-id-swiper'
import NoImage from '../../assets/img/no_image.png'
import 'swiper/css/swiper.css'

const ImageSwiper = (props: { images: Array<{ id: string; path: string }> }) => {
  const params = {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
  }

  const images = props.images

  return (
    <Swiper {...params}>
      {images.length === 0 ? (
        <div className="p-media__thumb">
          <img src={NoImage} alt="No Image" />
        </div>
      ) : (
        images.map((image: { id: string; path: string }) => (
          <div className="p-media__thumb" key={image.id}>
            <img src={image.path} alt="商品画像" />
          </div>
        ))
      )}
    </Swiper>
  )
}

export default ImageSwiper
