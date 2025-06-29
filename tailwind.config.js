/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#2B5F75', // Deep teal - primary
        'primary-50': '#F0F7F9', // Very light teal - primary-50
        'primary-100': '#D6E9ED', // Light teal - primary-100
        'primary-200': '#B3D7DE', // Medium light teal - primary-200
        'primary-300': '#8FC4CE', // Medium teal - primary-300
        'primary-400': '#6BB1BE', // Medium dark teal - primary-400
        'primary-500': '#479FAE', // Base teal - primary-500
        'primary-600': '#2B5F75', // Deep teal (primary) - primary-600
        'primary-700': '#1F4A5A', // Darker teal - primary-700
        'primary-800': '#13353F', // Very dark teal - primary-800
        'primary-900': '#0A1F24', // Darkest teal - primary-900

        // Secondary Colors
        'secondary': '#E8B86D', // Warm golden sand - secondary
        'secondary-50': '#FDF9F3', // Very light golden - secondary-50
        'secondary-100': '#FAF0E1', // Light golden - secondary-100
        'secondary-200': '#F5E2C3', // Medium light golden - secondary-200
        'secondary-300': '#F0D3A5', // Medium golden - secondary-300
        'secondary-400': '#EBC587', // Medium dark golden - secondary-400
        'secondary-500': '#E8B86D', // Warm golden sand (secondary) - secondary-500
        'secondary-600': '#D4A555', // Darker golden - secondary-600
        'secondary-700': '#B8923D', // Dark golden - secondary-700
        'secondary-800': '#9C7F25', // Very dark golden - secondary-800
        'secondary-900': '#806C0D', // Darkest golden - secondary-900

        // Accent Colors
        'accent': '#C7522A', // Terracotta - accent
        'accent-50': '#FBF3F0', // Very light terracotta - accent-50
        'accent-100': '#F5E1D9', // Light terracotta - accent-100
        'accent-200': '#EDBFB3', // Medium light terracotta - accent-200
        'accent-300': '#E59D8D', // Medium terracotta - accent-300
        'accent-400': '#DD7B67', // Medium dark terracotta - accent-400
        'accent-500': '#D55941', // Base terracotta - accent-500
        'accent-600': '#C7522A', // Terracotta (accent) - accent-600
        'accent-700': '#A8441F', // Darker terracotta - accent-700
        'accent-800': '#893614', // Very dark terracotta - accent-800
        'accent-900': '#6A2809', // Darkest terracotta - accent-900

        // Background Colors
        'background': '#FDFCFA', // Warm off-white - background
        'surface': '#F7F5F3', // Subtle warm gray - surface

        // Text Colors
        'text-primary': '#2C3E50', // Deep charcoal - text-primary
        'text-secondary': '#7F8C8D', // Medium gray - text-secondary

        // Status Colors
        'success': '#27AE60', // Natural green - success
        'success-50': '#F0F9F4', // Very light green - success-50
        'success-100': '#D4F1E0', // Light green - success-100
        'success-200': '#A8E3C1', // Medium light green - success-200
        'success-300': '#7CD5A2', // Medium green - success-300
        'success-400': '#50C783', // Medium dark green - success-400
        'success-500': '#27AE60', // Natural green (success) - success-500
        'success-600': '#1F8B4C', // Darker green - success-600
        'success-700': '#176838', // Dark green - success-700
        'success-800': '#0F4524', // Very dark green - success-800
        'success-900': '#072210', // Darkest green - success-900

        'warning': '#F39C12', // Warm amber - warning
        'warning-50': '#FEF8F0', // Very light amber - warning-50
        'warning-100': '#FDEBD9', // Light amber - warning-100
        'warning-200': '#FBD7B3', // Medium light amber - warning-200
        'warning-300': '#F9C38D', // Medium amber - warning-300
        'warning-400': '#F7AF67', // Medium dark amber - warning-400
        'warning-500': '#F39C12', // Warm amber (warning) - warning-500
        'warning-600': '#D4850A', // Darker amber - warning-600
        'warning-700': '#B56E02', // Dark amber - warning-700
        'warning-800': '#965700', // Very dark amber - warning-800
        'warning-900': '#774000', // Darkest amber - warning-900

        'error': '#E74C3C', // Confident red - error
        'error-50': '#FDF2F1', // Very light red - error-50
        'error-100': '#F9DEDD', // Light red - error-100
        'error-200': '#F3BDBB', // Medium light red - error-200
        'error-300': '#ED9C99', // Medium red - error-300
        'error-400': '#E77B77', // Medium dark red - error-400
        'error-500': '#E74C3C', // Confident red (error) - error-500
        'error-600': '#C73E2F', // Darker red - error-600
        'error-700': '#A73022', // Dark red - error-700
        'error-800': '#872215', // Very dark red - error-800
        'error-900': '#671408', // Darkest red - error-900
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
        'caption': ['Nunito Sans', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(43, 95, 117, 0.1)',
        'soft-md': '0 8px 24px rgba(43, 95, 117, 0.12)',
        'soft-lg': '0 16px 32px rgba(43, 95, 117, 0.15)',
      },
      animation: {
        'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.8',
          },
        },
      },
      backdropBlur: {
        'soft': '8px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}