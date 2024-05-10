import { createBrowserRouter } from 'react-router-dom'

import DefaultLayout from '@/layout/DefaultLayout'
import Home from '@/pages/home'

import { ROUTES } from './routes'

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <DefaultLayout />,
    children: [{ path: ROUTES.HOME, element: <Home /> }],
    // errorElement: <PageError />,
  },
  {
    path: '*',
    // element: <NotFound />,
  },
])
