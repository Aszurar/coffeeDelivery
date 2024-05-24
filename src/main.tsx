import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { theme } from '@/styles/theme.ts'

import { App } from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider
      theme={theme}
      toastOptions={{
        defaultOptions: {
          position: 'top-right',
          isClosable: true,
        },
      }}
    >
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
