import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// Test accounts are swapped in at build time only when the flag is on, so a
// production build never contains their credentials.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const testAccounts = env.VITE_ENABLE_TEST_ACCOUNTS === 'true'
    ? './src/auth/testAccounts.js'
    : './src/auth/noAccounts.js'

  return {
    plugins: [react()],
    resolve: {
      alias: {
        'virtual:accounts': fileURLToPath(new URL(testAccounts, import.meta.url)),
      },
    },
  }
})
