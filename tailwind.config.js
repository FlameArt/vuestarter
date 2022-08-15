/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'feed-lg': '777px',
        'desktop': '1110px'
      },
      fontSize: {
        '7': '.438rem',
        '8': '.5rem',
        '9': '.563rem',
        '10': '.625rem',
        '11': '.688rem',
      }
    },
    screens: {

      'mobile': { min: '320px', max: '1080px' },
      // => @media (min-width: 640px) { ... }

      'tablet': { min: '640px', max: '1080px' },
      // => @media (min-width: 640px) { ... }

      'desktop': '1080px',
      // => @media (min-width: 1280px) { ... }

    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents(
        {
          '.fc': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          '.fb': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          '.button': {
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor: 'white',
            padding: '2px 14px',
            '& svg,img': {
              width: '16px',
              marginRight: '4px'
            },
            '&:hover': {
              opacity: 0.8
            }
          },

        }
      )
    }),
  ],
}
