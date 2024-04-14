/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'first' : ["Platypi", 'serif'],
      },
      animation: {
        bounce200: 'bounce .7s infinite 200ms',
        bounce400: 'bounce .7s infinite 400ms',
      },
      keyframes: {
        drop_down: {
          '0%': { transform: 'translateX(200px)' },
          '100%': { transform: 'translateX(0px)' },
        },
      },
      animation: {
        bounce200: 'bounce200 .7s infinite 200ms',
        bounce400: 'bounce400 .7s infinite 400ms',
        drop_down: 'drop_down .5s ',
      },
      height: {
      },
      width: {
      },
      colors: {
        'first': '#1e1f22',
        'second': '#2b2d31',
        'third': '#313338',
        'message-bar': '#383a40',
        'loginbutton': '#5865f2',
        'loginbuttonhover': '#4752c4',
        'text-one': '#b0b5bb',
        'text-two': '#f2f3f5',
        'text-three': "#b5bac1",
        'forgotbutton': '#00a8fc',
        'inputfield': '#e8f0fe',
        'homegreen': '#23a559',
        "icons": "#7e8288",
      },
      fontSize: {
        '0.5r': '0.5rem',
        '0.8r': '0.8rem',
        '1r': '1rem',
        '3r': '3rem'
      },
      padding: {
        '0.25': '0.25rem',
        '0.4': '0.4rem',
        '1': '1rem',
        '0.8': '0.8rem'


      }
    },
    plugins: [],
  }
}