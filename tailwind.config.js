/** @type {import('tailwindcss').Config} */
export const content = [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust to your project structure
    './public/index.html',
];
export const theme = {
    extend: {},
};
export const plugins = [
    function ({ addUtilities }) {
        addUtilities({
            '.backface-hidden': {
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            },
            '.rotate-y-180': {
              transform: 'rotateY(180deg)',
            },
            '.perspective-1000': {
              perspective: '1000px',
            },
            '.preserve-3d': {
              transformStyle: 'preserve-3d',
            },
          });
    },
];
  