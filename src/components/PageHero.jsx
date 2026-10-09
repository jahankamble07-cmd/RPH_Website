export default function PageHero({ title, text, image, children }) {
  return (
    <section className="page-hero">
      {image && <img className="page-hero__img" src={image} alt="" />}
      <div className="container page-hero__body">
        <h1>{title}</h1>
        {text && <p>{text}</p>}
        {children}
      </div>
    </section>
  )
}
