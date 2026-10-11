import PageHero from '../components/PageHero'
import ComplaintForm from '../features/complaints/ComplaintForm'

export default function NewComplaint() {
  return (
    <>
      <PageHero title="Register a Complaint" text="Complaints go to the hall council and the warden." />
      <section className="section">
        <ComplaintForm />
      </section>
    </>
  )
}
