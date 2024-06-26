import { IOrder } from '@/dto/order'

import { ORDERS_COLLECTION } from '../storageConfig'
import { getOrders } from './get-orders'

export function saveOrder(order: IOrder) {
  const storage = getOrders()
  const storageFormatted = JSON.stringify([...storage, order])

  localStorage.setItem(ORDERS_COLLECTION, storageFormatted)
}
