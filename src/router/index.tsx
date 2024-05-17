import { createBrowserRouter } from 'react-router-dom'

import DefaultLayout from '@/layout/DefaultLayout'
import { Checkout } from '@/pages/checkout'
import Home from '@/pages/home'
import { OrderConfirmed } from '@/pages/order-confirmed'

import { ROUTES } from './routes'

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <DefaultLayout />,
    children: [
      { path: ROUTES.HOME, element: <Home /> },
      { path: ROUTES.CHECKOUT, element: <Checkout /> },
      { path: ROUTES.ORDER_CONFIRMED, element: <OrderConfirmed /> },
    ],
    // errorElement: <PageError />,
  },
  {
    path: '*',
    // element: <NotFound />,
  },
])
