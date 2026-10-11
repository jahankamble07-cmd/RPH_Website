import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import DonateModal from '../features/funding/DonateModal'
import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout() {
  const [donating, setDonating] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar onDonate={() => setDonating(true)} />
      <main id="main">
        <div className="page" key={pathname}>
          <Outlet context={{ openDonate: () => setDonating(true) }} />
        </div>
      </main>
      <Footer />
      {donating && <DonateModal onClose={() => setDonating(false)} />}
    </>
  )
}
