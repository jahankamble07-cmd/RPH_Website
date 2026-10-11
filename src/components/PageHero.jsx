export default function PageHero({ title, text, image, children }) {
  return (
    <section className="page-hero">
      {image && <img className="page-hero__img" src={image} alt="" />}
      <span className="dot-grid" aria-hidden="true" />
      <div className="container page-hero__body">
        <div className="hero-glass hero-glass--compact">
          <h1>{title}</h1>
          {text && <p>{text}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}
