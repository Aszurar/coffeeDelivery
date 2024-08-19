import { IOrder } from '@/dto/order'

import { api } from '../api'

export async function getOrders() {
  const response = await api.get<IOrder[]>('/orders')

  return response.data
}
