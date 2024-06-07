import { produce } from 'immer'
import { StateCreator } from 'zustand'

import {
  addQuantity,
  calculateTotalPriceOfItemsOnCart,
  updateQuantity,
  updateTotalItemsOnCart,
} from './utils'

export type CartProps = {
  id: string
  quantity: number
}

type CartItemIdentifierProps = Pick<CartProps, 'id'>

type CartSliceProps = {
  cart: CartProps[]
  totalItemsOnCart: number
  totalPriceOfItemsOnCart: number
  getTotalCurrentItem: ({ id }: CartItemIdentifierProps) => number
  addItemToCart: ({ id, quantity }: CartProps) => void
  updateItemOnCart: ({ id, quantity }: CartProps) => void
  decrementQuantityItemOnCart: ({ id }: CartItemIdentifierProps) => void
  incrementQuantityItemOnCart: ({ id }: CartItemIdentifierProps) => void
  removeItemFromCart: ({ id }: CartItemIdentifierProps) => void
  removeAllItemsFromCart: () => void
}

const createCartSlice: StateCreator<CartSliceProps> = (set, get) => ({
  cart: [],
  totalItemsOnCart: 0,
  totalPriceOfItemsOnCart: 0,
  getTotalCurrentItem: ({ id }: CartItemIdentifierProps) => {
    // checked
    const { cart } = get()
    const item = cart.find((item) => item.id === id)
    return item?.quantity ?? 0
  },
  addItemToCart: ({ id, quantity }) => {
    // checked
    set(
      produce((state: CartSliceProps) => {
        let cartAfterAdded = state.cart
        const item = state.cart.find((item) => item.id === id)

        if (item) {
          cartAfterAdded = state.cart.map((item) =>
            addQuantity({
              item,
              newItem: { id, quantity },
            }),
          )
        } else {
          cartAfterAdded.push({ id, quantity })
        }

        const totalItems = updateTotalItemsOnCart({
          updatedCart: cartAfterAdded,
        })
        const totalPriceOfAllItems = calculateTotalPriceOfItemsOnCart({
          updatedCart: cartAfterAdded,
        })

        state.cart = cartAfterAdded
        state.totalItemsOnCart = totalItems
        state.totalPriceOfItemsOnCart = totalPriceOfAllItems
      }),
    )
  },
  updateItemOnCart: ({ id, quantity }) => {
    set(
      produce((state: CartSliceProps) => {
        let cartAfterUpdate = state.cart
        const newItem = { id, quantity }
        const item = state.cart.find((item) => item.id === id)

        if (item) {
          cartAfterUpdate = state.cart.map((item) =>
            updateQuantity({ item, newItem }),
          )
        } else {
          cartAfterUpdate.push(newItem)
        }

        const totalItems = updateTotalItemsOnCart({
          updatedCart: cartAfterUpdate,
        })
        const totalPriceOfAllItems = calculateTotalPriceOfItemsOnCart({
          updatedCart: cartAfterUpdate,
        })

        state.cart = cartAfterUpdate
        state.totalItemsOnCart = totalItems
        state.totalPriceOfItemsOnCart = totalPriceOfAllItems
      }),
    )
  },
  decrementQuantityItemOnCart: ({ id }: CartItemIdentifierProps) => {
    const { getTotalCurrentItem, updateItemOnCart, removeItemFromCart } = get()
    const totalCurrentItem = getTotalCurrentItem({ id })

    if (totalCurrentItem > 1) {
      updateItemOnCart({ id, quantity: totalCurrentItem - 1 })
    } else {
      updateItemOnCart({ id, quantity: 0 })
      removeItemFromCart({ id })
    }
  },
  incrementQuantityItemOnCart: ({ id }: CartItemIdentifierProps) => {
    const { getTotalCurrentItem, updateItemOnCart } = get()
    const totalCurrentItem = getTotalCurrentItem({ id })

    updateItemOnCart({ id, quantity: totalCurrentItem + 1 })
  },
  removeItemFromCart: ({ id }) => {
    // checked
    set(
      produce((state: CartSliceProps) => {
        const cartListAfterRemove = state.cart.filter((item) => item.id !== id)

        const totalItems = updateTotalItemsOnCart({
          updatedCart: cartListAfterRemove,
        })
        const totalPriceOfAllItems = calculateTotalPriceOfItemsOnCart({
          updatedCart: cartListAfterRemove,
        })

        state.cart = cartListAfterRemove
        state.totalItemsOnCart = totalItems
        state.totalPriceOfItemsOnCart = totalPriceOfAllItems
      }),
    )
  },
  removeAllItemsFromCart: () => {
    set({
      cart: [],
      totalItemsOnCart: 0,
      totalPriceOfItemsOnCart: 0,
    })
  },
})

export type { CartSliceProps }
export { createCartSlice }
