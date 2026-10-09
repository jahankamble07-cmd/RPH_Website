import SupportModal from './SupportModal'

export default function DonateModal({ onClose, project }) {
  return <SupportModal type="funding" project={project} onClose={onClose} />
}
