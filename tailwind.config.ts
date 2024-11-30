import type { Config } from 'tailwindcss'

export default {
  content: ['./packages/**/src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        success: '#28a745',
        warning: '#ffc107',
        danger: '#dc3545'
      }
    }
  },
  plugins: []
} satisfies Config
