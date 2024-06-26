import { produce } from 'immer'
import { StateCreator } from 'zustand'

import { IOrder } from '@/dto/order'

type OrderStoreProps = {
  currentOrder: IOrder
  updateCurrentOrder: (newOrder: IOrder) => void
}

const createOrderStore: StateCreator<OrderStoreProps> = (set) => ({
  currentOrder: {} as IOrder,
  updateCurrentOrder: (newOrder: IOrder) => {
    set(
      produce((state: OrderStoreProps) => {
        state.currentOrder = newOrder
      }),
    )
  },
})

export type { OrderStoreProps }
export { createOrderStore }
