const ImagePreview = (props: { path: string; key: string; id: string; delete: any }) => {
  return (
    <div className="p-media__thumb" onClick={() => props.delete(props.id)}>
      <img src={props.path} alt="プレビュー画像" />
    </div>
  )
}
export default ImagePreview
