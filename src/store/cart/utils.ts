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
  const totalPrice = updatedCart.reduce((acc, item) => {
    return acc + item.price * item.quantity
  }, 0)
  return totalPrice
}

export {
  addQuantity,
  calculateTotalPriceOfItemsOnCart,
  updateQuantity,
  updateTotalItemsOnCart,
}
