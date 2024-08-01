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
  name: string
  price: number
  quantity: number
}

type CartItemIdentifierProps = Pick<CartProps, 'id'>

type CartStoreProps = {
  cart: CartProps[]
  totalItemsOnCart: number
  totalPriceOfItemsOnCart: number
  getTotalCurrentItem: ({ id }: CartItemIdentifierProps) => number
  addItemToCart: ({ id, name, price, quantity }: CartProps) => void
  updateItemOnCart: ({ id, quantity }: CartProps) => void
  decrementQuantityItemOnCart: ({ id }: CartItemIdentifierProps) => void
  incrementQuantityItemOnCart: ({ id }: CartItemIdentifierProps) => void
  removeItemFromCart: ({ id }: CartItemIdentifierProps) => void
  removeAllItemsFromCart: () => void
}

const createCartStore: StateCreator<CartStoreProps> = (set, get) => ({
  cart: [],
  totalItemsOnCart: 0,
  totalPriceOfItemsOnCart: 0,
  getTotalCurrentItem: ({ id }: CartItemIdentifierProps) => {
    // checked
    const { cart } = get()
    const item = cart.find((item) => item.id === id)
    return item?.quantity ?? 0
  },
  addItemToCart: ({ id, name, price, quantity }) => {
    // checked
    set(
      produce((state: CartStoreProps) => {
        let cartAfterAdded = state.cart
        const item = state.cart.find((item) => item.id === id)

        if (item) {
          cartAfterAdded = state.cart.map((item) =>
            addQuantity({
              item,
              newItem: { id, name, price, quantity },
            }),
          )
        } else {
          cartAfterAdded.push({ id, name, price, quantity })
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
  updateItemOnCart: ({ id, name, price, quantity }) => {
    set(
      produce((state: CartStoreProps) => {
        let cartAfterUpdate = state.cart
        const newItem = { id, name, price, quantity }
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
    const { cart, getTotalCurrentItem, updateItemOnCart, removeItemFromCart } =
      get()
    const totalCurrentItem = getTotalCurrentItem({ id })

    const currentItem = cart.find((item) => item.id === id)

    if (currentItem && totalCurrentItem > 1) {
      updateItemOnCart({
        id,
        name: currentItem.name,
        price: currentItem.price,
        quantity: totalCurrentItem - 1,
      })
    } else {
      updateItemOnCart({
        id,
        name: '',
        price: 0,
        quantity: 0,
      })
      removeItemFromCart({ id })
    }
  },
  incrementQuantityItemOnCart: ({ id }: CartItemIdentifierProps) => {
    const { cart, getTotalCurrentItem, updateItemOnCart } = get()
    const totalCurrentItem = getTotalCurrentItem({ id })
    const currentItem = cart.find((item) => item.id === id)

    if (!currentItem) return

    updateItemOnCart({
      id,
      name: currentItem.name,
      price: currentItem.price,
      quantity: totalCurrentItem + 1,
    })
  },
  removeItemFromCart: ({ id }) => {
    // checked
    set(
      produce((state: CartStoreProps) => {
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

export type { CartStoreProps }
export { createCartStore }
