// Local test accounts. Bundled only when VITE_ENABLE_TEST_ACCOUNTS=true
// (see vite.config.js). Never enable that flag for a production build.
export const accounts = [
  { id: 'test-student', email: 'test.student@test.com', password: '12345678', role: 'student', name: 'Test Student' },
  { id: 'test-alumni', email: 'test.alumini@test.com', password: '12345678', role: 'alumni', name: 'Test Alumni' },
  { id: 'test-hc', email: 'test.hc@test.com', password: '12345678', role: 'hall_council', name: 'Test Hall Council' },
  { id: 'test-warden', email: 'test.warden@test.com', password: '12345678', role: 'warden', name: 'Test Warden' },
]
