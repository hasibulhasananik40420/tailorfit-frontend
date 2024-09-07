/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      screens:{
        '2large': {'min': '1500px', 'max': '1600px'},
        '2mid75': {'min': '1601px', 'max': '1860px'},
        // '2mid80': {'min': '1651px', 'max': '1850px'},
        '2makbook': {'min': '1050px', 'max': '1250px'},
      },

      fontFamily:{
        "Poppins":["Poppins","sans-serif"],
        "Noto-Sans-Bengali":["Noto Sans Bengali","sans-serif"],
        'signature': ['"Dancing Script"', 'cursive'],

      },

      

      colors:{
        primaryColor:"#F00C89",
        secondaryColor:'#333',
         errorColor:'#FF5151',
        'btnColor': 'rgba(0, 0, 0, 0.50)',
        dashInAcColor:'rgba(255, 255, 255, 0.60)',
        switchColor:'rgba(0, 0, 0, 0.60)',
        primaryRgbaColor:'rgba(240, 12, 137, 0.1)',
        fillColorSidebar:'rgba(0, 0, 0, 0.10)'
      },
      backgroundImage:{
        'btn-hover': 'linear-gradient(96deg, #F30B88 0.94%, #9E24B6 94.94%)',
       
      },
      backgroundColor:{
          'logoBg':'rgba(255, 255, 255, 0.10)',
          'activeDhcolor':'rgba(240, 12, 137, 0.10)',
          'gray-btnColor':'rgba(0, 0, 0, 0.60)',
          'fillColor':'rgba(0, 0, 0, 0.10)',
          


          
      },
      borderColor:{
        'border-hover': 'linear-gradient(96deg, #F30B88 0.94%, #9E24B6 94.94%)',
         'borderColor':'rgba(0, 0, 0, 0.10)',
         'borderColor2':'rgba(0, 0, 0, 0.15)',
         'bgBorderColor':'rgba(128, 129, 145, 0.30)',
      },
      borderRadius:{
         'tab-Radius':'40px 0px 0px 40px'
      }
    },
  },
  plugins: [require('daisyui')],
}

