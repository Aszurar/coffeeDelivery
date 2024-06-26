import { create } from 'zustand'

import { AddressStoreProps, createAddressStore } from './address'
import { CartStoreProps, createCartStore } from './cart'
import { createOrderStore, OrderStoreProps } from './order'
import { createPaymentStore, PaymentStoreProps } from './payment'

const useCartStore = create<CartStoreProps>(createCartStore)
const useOrderStore = create<OrderStoreProps>(createOrderStore)
const useAddressStore = create<AddressStoreProps>(createAddressStore)
const usePaymentStore = create<PaymentStoreProps>(createPaymentStore)

const usePaymentSelectors = () =>
  usePaymentStore((state) => ({
    paymentType: state.paymentType,
    updatePaymentType: state.updatePaymentType,
  }))

const useOrderSelectors = () =>
  useOrderStore((state) => ({
    currentOrder: state.currentOrder,
    updateCurrentOrder: state.updateCurrentOrder,
  }))

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

export {
  useAddressSelectors,
  useCartSelectors,
  useOrderSelectors,
  usePaymentSelectors,
}
