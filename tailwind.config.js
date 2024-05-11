/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:
      {
        blue1: '#212A31',
        blue2: '#2E3944',
        blue3: '#124E66', //#0c2f3d
        blue4: '#748D92',
        btnAtv: '#166787',
        imgCol: '#bd9d94',
        homeFont: '#D7faf7',
        button1: '#846c3a',
        button2: '#6b582f',
        button3: '#504123',
        pink: '#D3D9D4',
        // bgColor: '#ced6fe',
        // bgDark: '#413F3D',
      },
      backgroundImage: {
        'hero-pattern': "https://images.unsplash.com/photo-1505051508008-923feaf90180?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }
    },
  },
  plugins: [],
}

