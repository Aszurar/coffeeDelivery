import { CartProps } from '.'

type AddQuantityProps = {
  item: CartProps
  newItem: CartProps
}

type UpdateQuantityProps = AddQuantityProps

function addQuantity({ item, newItem }: AddQuantityProps) {
  if (item.id === newItem.id) {
    return { ...item, quantity: item.quantity + newItem.quantity }
  }
  return item
}

function updateQuantity({ item, newItem }: UpdateQuantityProps) {
  if (item.id === newItem.id) {
    return { ...item, quantity: newItem.quantity }
  }
  return item
}

export { addQuantity, updateQuantity }
