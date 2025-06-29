module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 🔧 토스트 애니메이션 추가
      animation: {
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-out-right': 'slideOutRight 0.3s ease-in',
        'fade-in': 'fadeIn 0.3s ease-out',
        'bounce-in': 'bounceIn 0.5s ease-out',
      },
      keyframes: {
        slideInRight: {
          '0%': { 
            transform: 'translateX(100%)', 
            opacity: '0' 
          },
          '100%': { 
            transform: 'translateX(0)', 
            opacity: '1' 
          },
        },
        slideOutRight: {
          '0%': { 
            transform: 'translateX(0)', 
            opacity: '1' 
          },
          '100%': { 
            transform: 'translateX(100%)', 
            opacity: '0' 
          },
        },
        fadeIn: {
          '0%': { 
            opacity: '0' 
          },
          '100%': { 
            opacity: '1' 
          },
        },
        bounceIn: {
          '0%': { 
            transform: 'scale(0.3)', 
            opacity: '0' 
          },
          '50%': { 
            transform: 'scale(1.05)', 
            opacity: '1' 
          },
          '100%': { 
            transform: 'scale(1)', 
            opacity: '1' 
          },
        },
      },
      // 🔧 z-index 값 확장
      zIndex: {
        '9999': '9999',
        '10000': '10000',
      },
    },
  },
  plugins: [],
}