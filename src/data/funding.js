// Sample initiatives and funding needs from the Funding reference images.
// TODO: replace with the hall's real initiatives, amounts and contacts.
export const INITIATIVES = [
  { id: 'robotics-lab', sample: true, status: 'Ongoing', title: 'Autonomous Robotics Lab', text: 'Building autonomous robots for real-world applications in agriculture and disaster management.', image: 'robotics' },
  { id: 'solar-energy', sample: true, status: 'In Progress', title: 'Solar Energy Initiative', text: 'Installation of solar panels in hall rooftop to reduce energy consumption and promote sustainability.', image: 'solar' },
  { id: 'startup-cell', sample: true, status: 'Active', title: 'RP Startup Cell', text: 'Mentoring and funding budding startups with industry experts and alumni networks.', image: 'kgp-src' },
  { id: 'digital-library', sample: true, status: 'Completed', title: 'Digital Library Upgrade', text: 'New e-learning infrastructure with high-speed internet and modern study spaces.', image: 'library' },
]

// Field list from section 4.2 of the PDF.
export const FUNDING_FIELDS = [
  ['about', 'What the project is about'],
  ['current', 'Current situation and what has already been achieved'],
  ['improve', 'What needs improvement'],
  ['why', 'Why the improvement is required'],
  ['amount', 'Estimated funding required'],
  ['resources', 'Equipment, hardware, software or other resources needed'],
  ['use', 'How the contribution will be used'],
  ['impact', 'Expected impact of the contribution'],
  ['how', 'How alumni can contribute'],
  ['contact', 'Contact person / contact information'],
]

export const FUNDING_NEEDS = [
  { id: 'precision-drone', sample: true, title: 'Drone for Precision Agriculture', about: 'Developing autonomous drones for crop monitoring and soil analysis.', amount: 800000, image: 'drone' },
  { id: 'hpc-lab', sample: true, title: 'High Performance Computing Lab', about: 'Upgrade computing infrastructure for AI/ML research and innovation.', amount: 1500000, image: 'robot' },
  { id: 'innovation-lab', sample: true, title: 'RPH Innovation Lab', about: 'A makerspace for hardware, electronics and product development.', amount: 1000000, image: 'robotics' },
  { id: 'sports-upgrade', sample: true, title: 'Sports Infrastructure Upgrade', about: 'Renovation of ground and sports equipment for wider participation.', amount: 700000, image: 'football-2' },
]

// Section 4.3, verbatim.
export const WAYS_TO_CONTRIBUTE = [
  { id: 'funding', icon: 'heart', title: 'Funding' },
  { id: 'equipment', icon: 'tool', title: 'Providing equipment or resources' },
  { id: 'mentorship', icon: 'chat', title: 'Mentorship' },
  { id: 'connections', icon: 'handshake', title: 'Industry connections' },
  { id: 'expertise', icon: 'code', title: 'Technical expertise' },
  { id: 'careers', icon: 'briefcase', title: 'Internship or career opportunities' },
  { id: 'organizations', icon: 'building', title: 'Connecting projects with organizations or companies' },
]

// TODO(Q6): previously supported projects and their outcomes.
export const PAST_SUPPORTED = []

// Progress of an alumni pledge or offer, updated from Funding Requests.
export const SUPPORT_STATUS = {
  sent: 'Request sent',
  contacted: 'In discussion',
  received: 'Received',
  closed: 'Closed',
}
