import Modal from '../../components/Modal'
import SampleTag from '../../components/SampleTag'

const show = (v) => (v === undefined || v === null || v === '' ? <span className="muted">To be added</span> : v)

export default function OngoingProjectModal({ project, onClose }) {
  const p = project
  return (
    <Modal onClose={onClose} label={p.title}>
      <div className="modal__body stack">
        <div className="chips">
          <span className="chip chip--maroon">{p.status ?? 'Open'}</span>
          {p.kind && <span className="chip">{p.kind}</span>}
          {p.sample && <SampleTag />}
        </div>
        <h2>{p.title}</h2>
        <p>{p.summary}</p>
        <dl className="def-list">
          <dt>Looking for</dt><dd>{show(p.lookingFor)}</dd>
          <dt>Role / position</dt><dd>{show(p.role)}</dd>
          <dt>Required skills</dt><dd>{show(p.skills?.join(', '))}</dd>
          <dt>People required</dt><dd>{show(p.needed)}</dd>
          <dt>Opportunity type</dt><dd>{show(p.type)}</dd>
          <dt>Requirements</dt><dd>{show(p.requirements)}</dd>
          <dt>How to apply</dt><dd>{show(p.contact)}</dd>
          {p.postedBy && (<><dt>Posted by</dt><dd>{p.postedBy}</dd></>)}
        </dl>
      </div>
    </Modal>
  )
}
