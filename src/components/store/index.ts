import { create } from 'zustand'

import { COFFEE_TYPES } from '@/dto/coffee'

import { addQuantity, updateQuantity } from './utils'

type CartProps = {
  id: string
  quantity: number
}

type GetTotalCurrentItemProps = Pick<CartProps, 'id'>
type DecrementQuantityItemOnCartProps = GetTotalCurrentItemProps
type IncrementQuantityItemOnCartProps = GetTotalCurrentItemProps
type RemoveItemFromCartProps = GetTotalCurrentItemProps

type InitialStateProps = {
  cart: CartProps[]
  totalItemsOnCart: number
  totalPriceOfItemsOnCart: number
  updateTotalItemsOnCart: () => void
  getTotalCurrentItem: ({ id }: GetTotalCurrentItemProps) => number
  calculateTotalPriceOfItemsOnCart: () => void
  addItemToCart: ({ id, quantity }: CartProps) => void
  updateItemOnCart: ({ id, quantity }: CartProps) => void
  decrementQuantityItemOnCart: ({
    id,
  }: DecrementQuantityItemOnCartProps) => void
  incrementQuantityItemOnCart: ({
    id,
  }: IncrementQuantityItemOnCartProps) => void
  removeItemFromCart: ({ id }: RemoveItemFromCartProps) => void
  removeAllItemsFromCart: () => void
}

export const useStore = create<InitialStateProps>((set, get) => {
  return {
    cart: [],
    totalItemsOnCart: 0,
    totalPriceOfItemsOnCart: 0,
    updateTotalItemsOnCart: () => {
      // checked
      const { cart } = get()
      const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
      set({ totalItemsOnCart: totalItems })
    },
    getTotalCurrentItem: ({ id }: GetTotalCurrentItemProps) => {
      // checked
      const { cart } = get()
      const item = cart.find((item) => item.id === id)
      return item?.quantity || 0
    },
    calculateTotalPriceOfItemsOnCart: () => {
      // checked
      const { cart } = get()
      const totalPrice = cart.reduce((acc, item) => {
        const coffee = COFFEE_TYPES.find((coffee) => coffee.id === item.id) ?? {
          price: 0,
        }
        return acc + coffee.price * item.quantity
      }, 0)
      set({ totalPriceOfItemsOnCart: totalPrice })
    },
    removeItemFromCart: ({ id }) => {
      // checked
      const { updateTotalItemsOnCart, calculateTotalPriceOfItemsOnCart } = get()

      set((state) => ({
        cart: state.cart.filter((item) => item.id !== id),
      }))

      updateTotalItemsOnCart()
      calculateTotalPriceOfItemsOnCart()
    },
    addItemToCart: ({ id, quantity }) => {
      // checked
      const { cart, updateTotalItemsOnCart, calculateTotalPriceOfItemsOnCart } =
        get()
      const item = cart.find((item) => item.id === id)

      if (item) {
        set((state) => ({
          cart: state.cart.map((item) =>
            addQuantity({
              item,
              newItem: { id, quantity },
            }),
          ),
        }))
      } else {
        set((state) => ({
          cart: [...state.cart, { id, quantity }],
        }))
      }

      updateTotalItemsOnCart()
      calculateTotalPriceOfItemsOnCart()
    },
    updateItemOnCart: ({ id, quantity }) => {
      const { cart, updateTotalItemsOnCart, calculateTotalPriceOfItemsOnCart } =
        get()
      const newItem = { id, quantity }
      const item = cart.find((item) => item.id === id)

      if (item) {
        set((state) => ({
          cart: state.cart.map((item) => updateQuantity({ item, newItem })),
        }))
      } else {
        set((state) => ({
          cart: [...state.cart, newItem],
        }))
      }

      updateTotalItemsOnCart()
      calculateTotalPriceOfItemsOnCart()
    },
    decrementQuantityItemOnCart: ({ id }: DecrementQuantityItemOnCartProps) => {
      const { getTotalCurrentItem, updateItemOnCart, removeItemFromCart } =
        get()
      const totalCurrentItem = getTotalCurrentItem({ id })

      if (totalCurrentItem > 1) {
        updateItemOnCart({ id, quantity: totalCurrentItem - 1 })
      } else {
        updateItemOnCart({ id, quantity: 0 })
        removeItemFromCart({ id })
      }
    },
    incrementQuantityItemOnCart: ({ id }: IncrementQuantityItemOnCartProps) => {
      const { getTotalCurrentItem, updateItemOnCart } = get()
      const totalCurrentItem = getTotalCurrentItem({ id })

      updateItemOnCart({ id, quantity: totalCurrentItem + 1 })
    },
    removeAllItemsFromCart: () => {
      set({ cart: [] })
      set({ totalItemsOnCart: 0 })
      set({ totalPriceOfItemsOnCart: 0 })
    },
  }
})

export type { CartProps, RemoveItemFromCartProps }
