import '@/styles/global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { router } from './router'
import { queryClient } from './services/react-query'
import { axeAccessibilityReporter } from './utils/axeAccessibilityReporter'

export function App() {
  axeAccessibilityReporter()

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Helmet titleTemplate="%s | Coffee Delivery" />
        <RouterProvider router={router} />
      </HelmetProvider>
    </QueryClientProvider>
  )
}
