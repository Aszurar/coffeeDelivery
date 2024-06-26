import { AddressProps } from '@/store/address'
import { CartProps } from '@/store/cart'

import { PaymentTypeValues } from './payment'

export interface IOrder {
  id: string
  price: number
  paymentType: PaymentTypeValues
  address: AddressProps
  createdAt: Date
  cart: CartProps[]
}
