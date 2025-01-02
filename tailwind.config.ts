import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Adjust the paths according to your project structure
    './src/**/*.{js,ts,jsx,tsx}',
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        menuItemEnter: {
          to: {
            transform: 'translateY(0)',
            filter: 'blur(0)'
          }
        }
      },
      animation: {
        menuItemEnter: 'menuItemEnter 0.3s ease forwards'
      }
    }
  }
}

export default config

