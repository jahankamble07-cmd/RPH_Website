import { useParams } from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs'
import Icon from '../../components/Icon'
import Pending from '../../components/Pending'
import SampleTag from '../../components/SampleTag'
import { img } from '../../data/images'
import { FEATURED_PROJECTS } from '../../data/innovation'
import NotFound from '../NotFound'
import './Innovation.css'

function Block({ title, children, value }) {
  const empty = value === undefined || value === null || (Array.isArray(value) && value.length === 0)
  return (
    <section>
      <h2>{title}</h2>
      {empty ? <Pending /> : children}
    </section>
  )
}

export default function ProjectDetail() {
  const { projectId } = useParams()
  const p = FEATURED_PROJECTS.find((x) => x.id === projectId)
  if (!p) return <NotFound />

  return (
    <section className="section project-detail">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Innovation', to: '/innovation' }, { label: p.title }]} />
        <div className="section-head">
          <div className="stack">
            <h1>{p.title}</h1>
            <div className="chips">
              {p.tags.map((t) => <span key={t} className="chip">{t}</span>)}
              {p.sample && <SampleTag />}
            </div>
          </div>
        </div>
        <div className="project-detail__grid">
          <div>
            {p.image ? <img className="project-detail__img" src={img(p.image)} alt={p.title} /> : <div className="cover--empty"><Icon name="image" size={32} /></div>}
            <Block title="Description" value={p.summary}><p>{p.summary}</p></Block>
            <Block title="Aim / problem statement" value={p.aim}><p>{p.aim}</p></Block>
            <Block title="Project details" value={p.details}><p>{p.details}</p></Block>
            <Block title="Results / outcomes" value={p.results}><p>{p.results}</p></Block>
            <Block title="Photos and videos" value={p.media}>
              <div className="grid grid--3">{p.media?.map((m) => <img key={m} src={img(m)} alt="" className="cover" />)}</div>
            </Block>
          </div>
          <aside className="card card-body stack">
            <Block title="Team members" value={p.team}>
              <ul>{p.team?.map((t) => <li key={t}>{t}</li>)}</ul>
            </Block>
            <Block title="Timeline" value={p.timeline}><p>{p.timeline}</p></Block>
            <Block title="Links" value={p.links}>
              <ul>
                {p.links?.map((l) => (
                  <li key={l.url}><a href={l.url} target="_blank" rel="noreferrer">{l.label} <Icon name="external" size={13} /></a></li>
                ))}
              </ul>
            </Block>
          </aside>
        </div>
      </div>
    </section>
  )
}
