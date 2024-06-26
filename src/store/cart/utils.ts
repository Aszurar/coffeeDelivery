import { COFFEE_TYPES } from '@/dto/coffee'

import { CartProps } from '.'

type AddQuantityProps = {
  item: CartProps
  newItem: CartProps
}

type CartList = {
  updatedCart: CartProps[]
}

function addQuantity({ item, newItem }: AddQuantityProps) {
  if (item.id === newItem.id) {
    return { ...item, quantity: item.quantity + newItem.quantity }
  }
  return item
}

function updateQuantity({ item, newItem }: AddQuantityProps) {
  if (item.id === newItem.id) {
    return { ...item, quantity: newItem.quantity }
  }
  return item
}

function updateTotalItemsOnCart({ updatedCart }: CartList) {
  const totalItems = updatedCart.reduce((acc, item) => acc + item.quantity, 0)
  return totalItems
}

function calculateTotalPriceOfItemsOnCart({ updatedCart }: CartList) {
  // checked
  const totalPrice = updatedCart.reduce((acc, item) => {
    const coffee = COFFEE_TYPES.find((coffee) => coffee.id === item.id) ?? {
      price: 0,
    }
    return acc + coffee.price * item.quantity
  }, 0)
  return totalPrice
}

export {
  addQuantity,
  calculateTotalPriceOfItemsOnCart,
  updateQuantity,
  updateTotalItemsOnCart,
}
