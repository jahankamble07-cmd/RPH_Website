// "100+ Projects" is from the PDF text; the other figures are from the
// reference image. TODO(Q3): confirm before launch.
export const INNOVATION_STATS = [
  { icon: 'box', value: '100+', label: 'Projects' },
  { icon: 'rocket', value: '12', label: 'Startups' },
  { icon: 'book', value: '8', label: 'Patents' },
  { icon: 'trophy', value: '25+', label: 'National-Level Competition Wins' },
  { icon: 'globe', value: '15+', label: 'International-Level Competition Wins' },
  { icon: 'code', value: '40+', label: 'Hackathon Achievements / Wins' },
]

export const BUILD_AREAS = [
  { id: 'top', icon: 'bulb', image: 'robot', title: 'Top Innovations', text: 'Some of the best and most impactful innovations by RPians.' },
  { id: 'open-source', icon: 'code', image: 'robotics', title: 'Open-Source Contributions', text: 'GitHub repositories, websites, applications and other open-source work built by RPians.' },
  { id: 'real-world', icon: 'globe', image: 'solar', title: 'Real-World Problems Solved', text: 'Projects that solve practical, social or technical problems.' },
  { id: 'products', icon: 'box', image: 'drone', title: 'Popular Apps, Websites and Products', text: 'Apps, websites and products built by RPians.' },
  { id: 'research', icon: 'book', image: 'library', title: 'Research Work / Publications', text: 'Research papers, publications and other significant research work by RPians.' },
]

export const OPPORTUNITY_TYPES = ['Internship', 'Project', 'Full-time', 'Other']

// Sample projects from the Innovation reference image. Unverified claims in
// the mockup (awards) were left out. TODO: replace with real projects.
export const FEATURED_PROJECTS = [
  {
    id: 'rp-weather-station-network',
    sample: true,
    area: 'real-world',
    title: 'RP Weather Station Network',
    summary: 'A network of low-cost weather stations across campus to collect real-time environmental data, enabling research and data-driven decision making for a sustainable campus.',
    image: 'solar',
    tags: ['IoT', 'Data Science', 'Sustainability', 'Python'],
    team: ['5 RPians'],
    timeline: '2025 – Present',
  },
  {
    id: 'rp-campus-navigator',
    sample: true,
    area: 'products',
    title: 'RP Campus Navigator',
    summary: 'A navigation and information platform for the IITKGP campus.',
    image: 'kgp-src',
    tags: ['React', 'Maps', 'Web Apps'],
  },
  {
    id: 'low-cost-water-purifier',
    sample: true,
    area: 'real-world',
    title: 'Low-Cost Water Purifier',
    summary: 'Affordable water purification system for hostels.',
    image: null,
    tags: ['Hardware', 'IoT', 'Sustainability'],
  },
  {
    id: 'financial-analytics-platform',
    sample: true,
    area: 'open-source',
    title: 'Financial Analytics Platform',
    summary: 'A tool for tracking and analyzing student expenses.',
    image: null,
    tags: ['Python', 'Data Analysis', 'Web'],
  },
  {
    id: 'rp-cultural-archive',
    sample: true,
    area: 'top',
    title: 'RP Cultural Archive',
    summary: "Digital archive of RP's rich cultural history and events.",
    image: 'illu-3',
    tags: ['Web', 'Design', 'Documentation'],
  },
]

// Sample ongoing projects from the reference image. Fields the mockup does
// not show are left empty and render as "To be added".
export const ONGOING_PROJECTS = [
  { id: 'campus-ai-assistant', sample: true, status: 'Open', title: 'Campus AI Assistant', summary: 'An AI-powered assistant to help students with academic, mess, and campus-related queries.', skills: ['Python', 'LLMs', 'React'], needed: 3, type: 'Project', kind: 'Student Project' },
  { id: 'autonomous-delivery-drone', sample: true, status: 'Open', title: 'Autonomous Delivery Drone', summary: 'Developing an autonomous drone for intra-campus delivery and logistics.', skills: ['Robotics', 'Computer Vision'], needed: 4, type: 'Project', kind: 'Research Project', image: 'drone' },
  { id: 'sustainable-mess-operations', sample: true, status: 'Open', title: 'Sustainable Mess Operations', summary: 'Data-driven solutions to reduce food waste and improve mess efficiency.', skills: ['Data Analysis', 'Python'], needed: 2, type: 'Project', kind: 'Startup', image: 'kgp-canteen' },
  { id: 'affordable-water-testing-kit', sample: true, status: 'Looking', title: 'Affordable Water Testing Kit', summary: 'Portable kit for testing water quality in hostels and nearby areas.', skills: ['Electronics', 'Embedded'], needed: 3, type: 'Project', kind: 'Research Project' },
]

// TODO(Q10): URL of the external form for people who want their project
// listed. While empty, the button sends visitors to log in.
export const PROJECT_SUBMISSION_FORM_URL = ''
