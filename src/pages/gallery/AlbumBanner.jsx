export default function AlbumBanner({ title, text, image }) {
  return (
    <div className="album-banner">
      {image && <img src={image} alt="" />}
      <div className="album-banner__body">
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </div>
  )
}
