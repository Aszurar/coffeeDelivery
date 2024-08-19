import { IOrder } from '@/dto/order'

import { api } from '../api'

type RegisterOrderProps = {
  order: IOrder
}

export async function registerOrder({ order }: RegisterOrderProps) {
  await api.post('/orders', order)
}
