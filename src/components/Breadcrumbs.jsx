import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export default function Breadcrumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <Fragment key={item.label}>
          {i > 0 && <span aria-hidden="true">/</span>}
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
        </Fragment>
      ))}
    </nav>
  )
}
