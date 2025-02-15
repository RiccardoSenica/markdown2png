/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            pre: {
              backgroundColor: '#f6f8fa',
              padding: '1rem',
              borderRadius: '0.375rem',
              overflowX: 'auto',
            },
            code: {
              backgroundColor: '#f6f8fa',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontFamily: 'ui-monospace, monospace',
              fontSize: '0.875em',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
