/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#06131f',
        mist: '#eef6ff',
        accent: '#59f0b5',
        danger: '#ff7b72',
        warning: '#ffd66b',
      },
      boxShadow: {
        glow: '0 20px 50px rgba(89, 240, 181, 0.15)',
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at top left, rgba(89,240,181,0.25), transparent 32%), radial-gradient(circle at top right, rgba(71,118,230,0.18), transparent 28%), linear-gradient(135deg, rgba(8,21,35,1) 0%, rgba(4,13,25,1) 52%, rgba(10,24,43,1) 100%)',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
