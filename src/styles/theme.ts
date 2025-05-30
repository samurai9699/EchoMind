export const theme = {
  colors: {
    primary: {
      light: '#E6EEF9',
      DEFAULT: '#7FB3D5',
      dark: '#5A93B8',
    },
    secondary: {
      light: '#F0E6F9',
      DEFAULT: '#B39DDB',
      dark: '#9575CD',
    },
    accent: {
      light: '#E6F9F7',
      DEFAULT: '#4DB6AC',
      dark: '#26A69A',
    },
    error: {
      light: '#FCEAEA',
      DEFAULT: '#F44336',
      dark: '#C62828',
    },
    warning: {
      light: '#FFF8E6',
      DEFAULT: '#FFC107',
      dark: '#FF8F00',
    },
    success: {
      light: '#E8F5E9',
      DEFAULT: '#4CAF50',
      dark: '#2E7D32',
    },
    neutral: {
      white: '#FFFFFF',
      lightest: '#F8FAFC',
      lighter: '#F1F5F9',
      light: '#E2E8F0',
      medium: '#94A3B8',
      dark: '#64748B',
      darker: '#334155',
      darkest: '#1E293B',
      black: '#0F172A',
    },
    calculator: {
      display: '#F8FAFC',
      button: {
        number: '#FFFFFF',
        operator: '#F1F5F9',
        equals: '#7FB3D5',
        clear: '#FCEAEA',
      }
    },
    dark: {
      bg: '#0F172A',
      card: '#1E293B',
      border: '#334155',
      text: '#F1F5F9',
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
    sm: '0.375rem',
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