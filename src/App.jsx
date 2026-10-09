import { Route, Routes } from 'react-router-dom'
import RequireAccess from './auth/RequireAccess'
import Layout from './components/Layout'
import Complaints from './pages/Complaints'
import Funding from './pages/Funding'
import FundingRequests from './pages/FundingRequests'
import GalleryCategory from './pages/gallery/GalleryCategory'
import GalleryEvent from './pages/gallery/GalleryEvent'
import GalleryLanding from './pages/gallery/GalleryLanding'
import GallerySport from './pages/gallery/GallerySport'
import HallCouncil from './pages/HallCouncil'
import Home from './pages/Home'
import Innovation from './pages/innovation/Innovation'
import PostProject from './pages/innovation/PostProject'
import ProjectDetail from './pages/innovation/ProjectDetail'
import Legacy from './pages/Legacy'
import Login from './pages/Login'
import NewComplaint from './pages/NewComplaint'
import NotFound from './pages/NotFound'
import Recruitment from './pages/Recruitment'

const guarded = (permission, element) => <RequireAccess permission={permission}>{element}</RequireAccess>

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="hall-council" element={<HallCouncil />} />
        <Route path="our-legacy" element={<Legacy />} />
        <Route path="gallery" element={<GalleryLanding />} />
        <Route path="gallery/general-championship/:sportId" element={<GallerySport />} />
        <Route path="gallery/hall-activities/:eventId" element={<GalleryEvent />} />
        <Route path="gallery/:categoryId" element={<GalleryCategory />} />
        <Route path="innovation" element={<Innovation />} />
        <Route path="innovation/projects/:projectId" element={<ProjectDetail />} />
        <Route path="innovation/post" element={guarded('innovation.postProject', <PostProject />)} />
        <Route path="complaints/new" element={guarded('complaints.create', <NewComplaint />)} />
        <Route path="complaints" element={guarded('complaints.review', <Complaints />)} />
        <Route path="funding" element={guarded('funding.view', <Funding />)} />
        <Route path="recruitment" element={guarded('recruitment.manage', <Recruitment />)} />
        <Route path="funding-requests" element={guarded('fundingRequests.view', <FundingRequests />)} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
