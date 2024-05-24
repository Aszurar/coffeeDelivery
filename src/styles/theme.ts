import { extendTheme, Theme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#FAFAFA',
        color: '#574F4D',
      },
    },
  },

  fonts: {
    heading: `'Baloo 2', sans-serif`,
    body: `'Roboto', sans-serif`,
  },

  fontSizes: {
    '4xl.5': '2rem',
  },
  sizes: {
    '5xl.5': '70rem',
  },

  colors: {
    gray: {
      100: '#FAFAFA',
      200: '#F3F2F2',
      300: '#EDEDED',
      400: '#E6E5E5',
      500: '#D7D5D5',
      550: '#8D8686',
      600: '#52525b',
      700: '#574F4D',
      800: '#403937',
      900: '#272221',
    },
    yellow: {
      50: 'rgba(219, 172, 44, 0)',
      200: '#F1E9C9',
      300: '#E9DFAF',
      500: '#DBAC2C',
      700: '#C47F17',
      750: '#975A16',
    },
    purple: {
      200: '#EBE5F9',
      500: '#8047F8',
      700: '#4B2995',
    },
  },

  // eslint-disable-next-line @typescript-eslint/ban-types
} as Theme | {})
