import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { can } from '../../auth/roles'
import { useAuth } from '../../auth/useAuth'
import FilmHero from '../../components/FilmHero'
import Icon from '../../components/Icon'
import Pills from '../../components/Pills'
import Reveal from '../../components/Reveal'
import SampleTag from '../../components/SampleTag'
import { img } from '../../data/images'
import {
  BUILD_AREAS,
  FEATURED_PROJECTS,
  INNOVATION_STATS,
  ONGOING_PROJECTS,
  OPPORTUNITY_TYPES,
  PROJECT_SUBMISSION_FORM_URL,
} from '../../data/innovation'
import OngoingProjectModal from '../../features/innovation/OngoingProjectModal'
import OpportunityCard from '../../features/innovation/OpportunityCard'
import { COLLECTIONS, useCollection } from '../../lib/store'
import './Innovation.css'

function ProjectImage({ src }) {
  return src ? (
    <img className="cover" src={img(src)} alt="" loading="lazy" />
  ) : (
    <div className="cover--empty"><Icon name="image" size={28} /></div>
  )
}

const HERO_SLIDES = ['robotics', 'rp-hall', 'robot', 'drone', 'solar', 'illu-prep'].map(img)

function PostAction({ user, className = 'btn' }) {
  if (can(user, 'innovation.postProject')) {
    return <Link to="/innovation/post" className={className}><Icon name="plus" size={16} /> Post a project</Link>
  }
  if (can(user, 'innovation.postOpportunity')) {
    return <Link to="/recruitment" className={className}><Icon name="plus" size={16} /> Post an opportunity</Link>
  }
  return null
}

// Highlighted call to post, shown at the top of the projects area.
function PostStrip({ user }) {
  let title = 'Building something? Post your project.'
  let text = 'List it here so students across campus can find it and join your team.'
  let action = <PostAction user={user} className="btn btn--donate" />
  if (!can(user, 'innovation.postProject')) {
    if (can(user, 'innovation.postOpportunity')) {
      title = 'Hiring or mentoring? Post an opportunity.'
      text = 'Openings you post appear under Explore Opportunities on this page.'
    } else if (!user) {
      text = 'Log in with your hall account to post a project.'
      action = <Link to="/login?next=/innovation/post" className="btn btn--donate">Log in to post <Icon name="arrow" size={14} /></Link>
    } else {
      return null
    }
  }
  return (
    <Reveal className="post-strip">
      <span className="post-strip__icon"><Icon name="rocket" size={26} /></span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      {action}
    </Reveal>
  )
}

function SubmitButton({ user }) {
  if (can(user, 'innovation.postProject')) {
    return <Link to="/innovation/post" className="btn btn--light">Submit Your Project <Icon name="arrow" size={14} /></Link>
  }
  if (PROJECT_SUBMISSION_FORM_URL) {
    return <a href={PROJECT_SUBMISSION_FORM_URL} target="_blank" rel="noreferrer" className="btn btn--light">Submit Your Project <Icon name="external" size={14} /></a>
  }
  return <Link to="/login?next=/innovation/post" className="btn btn--light">Log in to submit <Icon name="arrow" size={14} /></Link>
}

export default function Innovation() {
  const { user } = useAuth()
  const { items: posted } = useCollection(COLLECTIONS.projects)
  const { items: opportunities } = useCollection(COLLECTIONS.opportunities)
  const [area, setArea] = useState('all')
  const [openProject, setOpenProject] = useState(null)
  const [type, setType] = useState('All')
  const [query, setQuery] = useState('')

  const featured = FEATURED_PROJECTS.filter((p) => area === 'all' || p.area === area)
  const [lead, ...others] = featured
  const ongoing = [...posted, ...ONGOING_PROJECTS]

  const filteredOpps = useMemo(() => {
    const q = query.trim().toLowerCase()
    return opportunities.filter((o) => {
      if (type !== 'All' && o.type !== type) return false
      if (!q) return true
      return [o.role, o.company, o.location, ...(o.skills ?? [])].join(' ').toLowerCase().includes(q)
    })
  }, [opportunities, type, query])

  const pickArea = (id) => {
    setArea(id)
    document.getElementById('featured')?.scrollIntoView()
  }

  return (
    <>
      <FilmHero slides={HERO_SLIDES} className="inno-hero">
        <h1 className="rise" style={{ '--i': 0 }}>Ideas that leave <em>the classroom.</em></h1>
        <p className="rise" style={{ '--i': 1 }}>Showcasing the projects, research, startups and opportunities built by RPians.</p>
        <div className="rise" style={{ '--i': 2 }}>
          <PostAction user={user} className="btn btn--gold" />
        </div>
        <nav className="film-hero__links rise" style={{ '--i': 3 }} aria-label="On this page">
          <a href="#building">What RPians are building</a>
          <a href="#featured">Featured Projects</a>
          <a href="#contribute">Contribute to Projects</a>
          <a href="#opportunities">Opportunities</a>
        </nav>
      </FilmHero>

      <section className="container">
        <Reveal as="dl" className="inno-stats card" variant="zoom">
          {INNOVATION_STATS.map((s) => (
            <div key={s.label}>
              <Icon name={s.icon} size={22} />
              <dd>{s.value}</dd>
              <dt>{s.label}</dt>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="section" id="building">
        <div className="container">
          <PostStrip user={user} />
          <Reveal className="section-head">
            <h2>What are RPians building?</h2>
          </Reveal>
          <div className="build-grid">
            {BUILD_AREAS.map((a, i) => (
              <Reveal key={a.id} delay={i * 80}>
                <button type="button" className="build card lift" onClick={() => pickArea(a.id)}>
                  <img src={img(a.image)} alt="" className="cover" loading="lazy" />
                  <span className="build__icon"><Icon name={a.icon} size={18} /></span>
                  <span className="build__body">
                    <span className="build__title">{a.title}</span>
                    <span className="muted small">{a.text}</span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--band" id="featured">
        <div className="container">
          <div className="section-head">
            <h2>Featured Projects</h2>
            <Pills
              options={[{ id: 'all', label: 'All' }, ...BUILD_AREAS.map((a) => ({ id: a.id, label: a.title }))]}
              value={area}
              onChange={setArea}
              label="Project area"
            />
          </div>
          {lead ? (
            <>
              <Link to={`/innovation/projects/${lead.id}`} className="feature card lift">
                <ProjectImage src={lead.image} />
                <div className="feature__body">
                  <div className="chips"><span className="chip chip--maroon">Featured</span>{lead.sample && <SampleTag />}</div>
                  <h3>{lead.title}</h3>
                  <p className="muted">{lead.summary}</p>
                  <div className="chips">{lead.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                  <span className="link-arrow">View project <Icon name="arrow" size={14} /></span>
                </div>
              </Link>
              <div className="grid grid--4 feature-list">
                {others.map((p) => (
                  <Link key={p.id} to={`/innovation/projects/${p.id}`} className="card tile-link lift">
                    <ProjectImage src={p.image} />
                    <div className="card-body stack">
                      <h3>{p.title} {p.sample && <SampleTag />}</h3>
                      <p className="muted small">{p.summary}</p>
                      <div className="chips">{p.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <p className="empty">No projects in this area yet.</p>
          )}
        </div>
      </section>

      <section className="section" id="contribute">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Contribute to Projects</h2>
              <p>Ongoing student projects and startups looking for collaborators.</p>
            </div>
            <PostAction user={user} />
          </div>
          <div className="ongoing">
            {ongoing.map((p) => (
              <article key={p.id} className="card ongoing__card lift">
                {p.image ? <img className="cover" src={img(p.image)} alt="" loading="lazy" /> : <div className="cover--empty"><Icon name="users" size={28} /></div>}
                <div className="card-body stack">
                  <div className="chips">
                    <span className="chip chip--maroon">{p.status ?? 'Open'}</span>
                    {p.sample && <SampleTag />}
                  </div>
                  <h3>{p.title}</h3>
                  <p className="muted small">{p.summary}</p>
                  {p.skills?.length > 0 && <div className="chips">{p.skills.map((s) => <span key={s} className="chip">{s}</span>)}</div>}
                  <p className="small ongoing__meta">
                    <span><Icon name="users" size={14} /> {p.needed ? `${p.needed} needed` : 'Team size open'}</span>
                    <span><Icon name="briefcase" size={14} /> {p.kind ?? p.type}</span>
                  </p>
                  <button type="button" className="btn btn--outline btn--small" onClick={() => setOpenProject(p)}>
                    Details and how to join
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ivory" id="opportunities">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Explore Opportunities</h2>
              <p>Internships, full-time roles and other openings shared by RP alumni.</p>
            </div>
          </div>
          <div className="opp-filters">
            <label className="search">
              <Icon name="search" size={16} />
              <span className="visually-hidden">Search opportunities</span>
              <input className="input" type="search" placeholder="Search roles, skills, companies" value={query} onChange={(e) => setQuery(e.target.value)} />
            </label>
            <Pills options={['All', ...OPPORTUNITY_TYPES]} value={type} onChange={setType} label="Opportunity type" />
          </div>
          {filteredOpps.length ? (
            <div className="grid grid--2">
              {filteredOpps.map((o) => <OpportunityCard key={o.id} o={o} />)}
            </div>
          ) : (
            <p className="empty">
              {opportunities.length ? 'No openings match your search.' : 'No openings posted yet. Alumni can post them from the Recruitment page.'}
            </p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="cta" variant="zoom">
            <div>
              <h2>Have something worth building?</h2>
              <p>Add your project to find collaborators.</p>
            </div>
            <SubmitButton user={user} />
          </Reveal>
        </div>
      </section>

      {openProject && <OngoingProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
    </>
  )
}
