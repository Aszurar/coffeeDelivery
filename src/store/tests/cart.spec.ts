import { beforeEach, describe, expect, it } from 'vitest'

import { COFFEE_TYPES } from '@/dto/coffee'

import { useCartStore as cartStore } from '..'

const initialState = cartStore.getState()

describe('Cart Store', () => {
  beforeEach(() => {
    // Reset the state before each test
    cartStore.setState(initialState)
  })

  // addItemToCart()
  it('should be able to add item to cart', () => {
    const { addItemToCart } = cartStore.getState()

    const someCoffee = COFFEE_TYPES[0]

    addItemToCart({
      id: someCoffee.id,
      name: someCoffee.name,
      price: someCoffee.price,
      quantity: 2,
    })

    const { cart } = cartStore.getState()

    expect(cart.length).toBe(1)
    expect(cart[0].id).toBe(someCoffee.id)
    expect(cart[0].quantity).toBe(2)
  })

  it('should be able to add more quantity to an existing item in cart', () => {
    const { addItemToCart } = cartStore.getState()
    const someCoffee = COFFEE_TYPES[2]

    addItemToCart({
      id: someCoffee.id,
      name: someCoffee.name,
      price: someCoffee.price,
      quantity: 2,
    })

    addItemToCart({
      id: someCoffee.id,
      name: someCoffee.name,
      price: someCoffee.price,
      quantity: 3,
    })

    const { cart } = cartStore.getState()

    expect(cart.length).toBe(1)
    expect(cart[0].id).toBe(someCoffee.id)
    expect(cart[0].quantity).toBe(5)
  })

  it('should be able to add different items to cart', () => {
    const { addItemToCart } = cartStore.getState()
    const someCoffee = COFFEE_TYPES[2]
    const anotherCoffee = COFFEE_TYPES[3]

    addItemToCart({
      id: someCoffee.id,
      name: someCoffee.name,
      price: someCoffee.price,
      quantity: 2,
    })

    addItemToCart({
      id: anotherCoffee.id,
      name: anotherCoffee.name,
      price: anotherCoffee.price,
      quantity: 3,
    })

    const { cart } = cartStore.getState()

    expect(cart.length).toBe(2)
    expect(cart[0].id).toBe(someCoffee.id)
    expect(cart[0].quantity).toBe(2)
    expect(cart[1].id).toBe(anotherCoffee.id)
    expect(cart[1].quantity).toBe(3)
  })

  it('should be able to calculate total items on Cart', () => {
    const { addItemToCart } = cartStore.getState()
    const someCoffee = COFFEE_TYPES[2]
    const anotherCoffee = COFFEE_TYPES[3]

    addItemToCart({
      id: someCoffee.id,
      name: someCoffee.name,
      price: someCoffee.price,
      quantity: 2,
    })

    addItemToCart({
      id: anotherCoffee.id,
      name: anotherCoffee.name,
      price: anotherCoffee.price,
      quantity: 3,
    })

    const { totalItemsOnCart } = cartStore.getState()

    expect(totalItemsOnCart).toBe(5)
  })

  it('should be able to calculate total price of items on Cart', () => {
    const { addItemToCart } = cartStore.getState()
    const someCoffee = COFFEE_TYPES[2]
    const anotherCoffee = COFFEE_TYPES[3]

    addItemToCart({
      id: someCoffee.id,
      name: someCoffee.name,
      price: someCoffee.price,
      quantity: 2,
    })

    addItemToCart({
      id: anotherCoffee.id,
      name: anotherCoffee.name,
      price: anotherCoffee.price,
      quantity: 3,
    })

    const totalPrice = someCoffee.price * 2 + anotherCoffee.price * 3

    const { totalPriceOfItemsOnCart } = cartStore.getState()

    expect(totalPriceOfItemsOnCart).toBe(totalPrice)
  })

  // getTotalCurrentItem
  it('should be able to get the quantity of an item in the cart', () => {
    const { addItemToCart, getTotalCurrentItem } = cartStore.getState()
    const someCoffee = COFFEE_TYPES[2]

    addItemToCart({
      id: someCoffee.id,
      name: someCoffee.name,
      price: someCoffee.price,
      quantity: 17,
    })

    const quantity = getTotalCurrentItem({ id: someCoffee.id })

    expect(quantity).toBe(17)
  })

  // incrementQuantityItemOnCart
  it('should be able to increment the quantity of an item in the cart', () => {
    const { addItemToCart, getTotalCurrentItem, incrementQuantityItemOnCart } =
      cartStore.getState()
    const someCoffee = COFFEE_TYPES[2]

    addItemToCart({
      id: someCoffee.id,
      name: someCoffee.name,
      price: someCoffee.price,
      quantity: 17,
    })

    incrementQuantityItemOnCart({ id: someCoffee.id })

    const quantity = getTotalCurrentItem({ id: someCoffee.id })

    expect(quantity).toBe(18)
  })

  it("shouldn't be able to increment the quantity of an item in the cart if it doesn't exist", () => {
    const { incrementQuantityItemOnCart } = cartStore.getState()

    incrementQuantityItemOnCart({ id: 'non-existing-id' })

    const { cart } = cartStore.getState()

    expect(cart.length).toBe(0)
  })

  // decrementQuantityItemOnCart
  it('should be able to decrement the quantity of an item in the cart', () => {
    const { addItemToCart, getTotalCurrentItem, decrementQuantityItemOnCart } =
      cartStore.getState()
    const someCoffee = COFFEE_TYPES[2]

    addItemToCart({
      id: someCoffee.id,
      name: someCoffee.name,
      price: someCoffee.price,
      quantity: 17,
    })

    decrementQuantityItemOnCart({ id: someCoffee.id })

    const quantity = getTotalCurrentItem({ id: someCoffee.id })

    expect(quantity).toBe(16)
  })

  it("should be able to remove an item from the cart if it's quantity is 1", () => {
    const { addItemToCart, decrementQuantityItemOnCart } = cartStore.getState()
    const someCoffee = COFFEE_TYPES[2]

    addItemToCart({
      id: someCoffee.id,
      name: someCoffee.name,
      price: someCoffee.price,
      quantity: 1,
    })

    decrementQuantityItemOnCart({ id: someCoffee.id })

    const { cart } = cartStore.getState()

    expect(cart.length).toBe(0)
  })

  it("should be able to remove an item from the cart if it's not found ", () => {
    const { decrementQuantityItemOnCart } = cartStore.getState()

    decrementQuantityItemOnCart({ id: 'non-existing-id' })

    const { cart } = cartStore.getState()

    expect(cart.length).toBe(0)
  })

  it('should be able remove an item from the cart', () => {
    const { addItemToCart, removeItemFromCart } = cartStore.getState()
    const someCoffee = COFFEE_TYPES[2]

    addItemToCart({
      id: someCoffee.id,
      name: someCoffee.name,
      price: someCoffee.price,
      quantity: 1,
    })

    removeItemFromCart({ id: someCoffee.id })

    const { cart } = cartStore.getState()

    expect(cart.length).toBe(0)
  })

  it('should be able to remove all items from the cart', () => {
    const { addItemToCart, removeAllItemsFromCart } = cartStore.getState()
    const someCoffee = COFFEE_TYPES[2]
    const anotherCoffee = COFFEE_TYPES[3]

    addItemToCart({
      id: someCoffee.id,
      name: someCoffee.name,
      price: someCoffee.price,
      quantity: 1,
    })

    addItemToCart({
      id: anotherCoffee.id,
      name: anotherCoffee.name,
      price: anotherCoffee.price,
      quantity: 1,
    })

    removeAllItemsFromCart()

    const { cart } = cartStore.getState()

    expect(cart.length).toBe(0)
  })

  it('should be able add items to cart, increment and decrement the quantity of an item and remove an item from the cart and get the quantity items cart and total price', () => {
    const {
      addItemToCart,
      incrementQuantityItemOnCart,
      decrementQuantityItemOnCart,
      removeItemFromCart,
    } = cartStore.getState()
    const someCoffee = COFFEE_TYPES[2]
    const anotherCoffee = COFFEE_TYPES[3]
    const anotherCoffee2 = COFFEE_TYPES[4]

    addItemToCart({
      id: someCoffee.id,
      name: someCoffee.name,
      price: someCoffee.price,
      quantity: 1,
    })

    addItemToCart({
      id: anotherCoffee.id,
      name: anotherCoffee.name,
      price: anotherCoffee.price,
      quantity: 10,
    })
    addItemToCart({
      id: anotherCoffee2.id,
      name: anotherCoffee2.name,
      price: anotherCoffee2.price,
      quantity: 1,
    })

    incrementQuantityItemOnCart({ id: someCoffee.id })

    incrementQuantityItemOnCart({ id: anotherCoffee.id })

    incrementQuantityItemOnCart({ id: anotherCoffee.id })

    decrementQuantityItemOnCart({ id: anotherCoffee.id })

    removeItemFromCart({ id: anotherCoffee2.id })

    const totalPrice = someCoffee.price * 2 + anotherCoffee.price * 11

    const { cart, totalItemsOnCart, totalPriceOfItemsOnCart } =
      cartStore.getState()

    expect(cart.length).toBe(2)
    expect(cart[0].id).toBe(someCoffee.id)
    expect(cart[0].quantity).toBe(2)
    expect(cart[1].id).toBe(anotherCoffee.id)
    expect(cart[1].quantity).toBe(11)
    expect(totalItemsOnCart).toBe(13)
    expect(totalPriceOfItemsOnCart).toBe(totalPrice)
  })

  it('should be able add items to cart, increment and decrement the quantity of an item and remove an item from the cart and get the quantity items cart, total price and clean the cart', () => {
    const {
      addItemToCart,
      incrementQuantityItemOnCart,
      decrementQuantityItemOnCart,
      removeItemFromCart,
      removeAllItemsFromCart,
    } = cartStore.getState()
    const someCoffee = COFFEE_TYPES[2]
    const anotherCoffee = COFFEE_TYPES[3]
    const anotherCoffee2 = COFFEE_TYPES[4]

    addItemToCart({
      id: someCoffee.id,
      name: someCoffee.name,
      price: someCoffee.price,
      quantity: 1,
    })

    addItemToCart({
      id: anotherCoffee.id,
      name: anotherCoffee.name,
      price: anotherCoffee.price,
      quantity: 10,
    })
    addItemToCart({
      id: anotherCoffee2.id,
      name: anotherCoffee2.name,
      price: anotherCoffee2.price,
      quantity: 1,
    })

    incrementQuantityItemOnCart({ id: someCoffee.id })

    incrementQuantityItemOnCart({ id: anotherCoffee.id })

    incrementQuantityItemOnCart({ id: anotherCoffee.id })

    decrementQuantityItemOnCart({ id: anotherCoffee.id })

    removeItemFromCart({ id: anotherCoffee2.id })
    removeAllItemsFromCart()

    const { cart, totalItemsOnCart, totalPriceOfItemsOnCart } =
      cartStore.getState()

    expect(cart.length).toBe(0)
    expect(totalItemsOnCart).toBe(0)
    expect(totalPriceOfItemsOnCart).toBe(0)
  })
})
