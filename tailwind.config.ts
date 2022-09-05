import { Config } from 'tailwindcss'
const formKitTailwind = require('@formkit/themes/tailwindcss')

export default <Config> {
  theme: {
    extend: {}
  },
  content: ['./formkit.config.ts'],
  plugins: [
    formKitTailwind
  ]
}