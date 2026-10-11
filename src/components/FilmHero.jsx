// Full-width hero with photos drifting right to left behind the text.
export default function FilmHero({ slides, className = '', children }) {
  const strip = [...slides, ...slides]
  return (
    <section className={`film-hero ${className}`}>
      <div className="film-hero__strip" aria-hidden="true">
        {strip.map((src, i) => <img key={i} src={src} alt="" />)}
      </div>
      <span className="dot-grid" aria-hidden="true" />
      <div className="container film-hero__body">
        <div className="hero-glass">{children}</div>
      </div>
    </section>
  )
}
