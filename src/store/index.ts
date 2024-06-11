import { create } from 'zustand'

import { AddressSliceProps, createAddressSlice } from './slices/address'
import { CartSliceProps, createCartSlice } from './slices/cart'

const useCartStore = create<CartSliceProps>(createCartSlice)
const useAddressStore = create<AddressSliceProps>(createAddressSlice)

const useAddressSelectors = () =>
  useAddressStore((state) => ({
    addresses: state.addresses,
    totalAddresses: state.totalAddresses,
    maxAddresses: state.maxAddresses,
    addNewAddress: state.addNewAddress,
    selectedAddress: state.selectedAddress,
    selectAddress: state.selectAddress,
    updateAddress: state.updateAddress,
    removeAddress: state.removeAddress,
    deleteAllAddresses: state.deleteAllAddresses,
    addIncompleteAddressOnSelectedAddress:
      state.addIncompleteAddressOnSelectedAddress,
  }))

// Hook para selecionar partes específicas do estado do cart com shallow
const useCartSelectors = () =>
  useCartStore((state) => ({
    cart: state.cart,
    totalItemsOnCart: state.totalItemsOnCart,
    totalPriceOfItemsOnCart: state.totalPriceOfItemsOnCart,
    getTotalCurrentItem: state.getTotalCurrentItem,
    addItemToCart: state.addItemToCart,
    updateItemOnCart: state.updateItemOnCart,
    decrementQuantityItemOnCart: state.decrementQuantityItemOnCart,
    incrementQuantityItemOnCart: state.incrementQuantityItemOnCart,
    removeItemFromCart: state.removeItemFromCart,
    removeAllItemsFromCart: state.removeAllItemsFromCart,
  }))

export { useAddressSelectors, useCartSelectors }
