export const theme = {
  colors: {
    primary: {
      light: '#A6D1E6',
      DEFAULT: '#7FB3D5',
      dark: '#5A93B8',
    },
    secondary: {
      light: '#D7C6E3',
      DEFAULT: '#B39DDB',
      dark: '#9575CD',
    },
    accent: {
      light: '#7EBDC2',
      DEFAULT: '#4DB6AC',
      dark: '#26A69A',
    },
    error: {
      light: '#EF9A9A',
      DEFAULT: '#F44336',
      dark: '#C62828',
    },
    warning: {
      light: '#FFE082',
      DEFAULT: '#FFC107',
      dark: '#FF8F00',
    },
    success: {
      light: '#A5D6A7',
      DEFAULT: '#4CAF50',
      dark: '#2E7D32',
    },
    neutral: {
      white: '#FFFFFF',
      lightest: '#F7F7F7',
      lighter: '#E5E5E5',
      light: '#D4D4D4',
      medium: '#A0A0A0',
      dark: '#737373',
      darker: '#404040',
      darkest: '#262626',
      black: '#171717',
    },
    calculator: {
      display: '#F0F0F0',
      button: {
        number: '#FFFFFF',
        operator: '#F5F5F5',
        equals: '#7FB3D5',
        clear: '#FFD7D7',
      }
    },
  },
  fonts: {
    sans: '"Nunito", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    rounded: '"Quicksand", "Nunito", system-ui, sans-serif',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  borderRadius: {
    sm: '0.25rem',
    DEFAULT: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    DEFAULT: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export type Theme = typeof theme;