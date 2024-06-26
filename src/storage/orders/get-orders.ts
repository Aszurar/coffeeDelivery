import { IOrder } from '@/dto/order'

import { ORDERS_COLLECTION } from '../storageConfig'

export function getOrders() {
  const orders = localStorage.getItem(ORDERS_COLLECTION)
  const ordersFormatted: IOrder[] = orders ? JSON.parse(orders) : []

  return ordersFormatted
}
