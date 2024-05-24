import { create } from 'zustand'

import { AddressSliceProps, createAddressSlice } from './slices/address'
import { CartSliceProps, createCartSlice } from './slices/cart'

const useStore = create<CartSliceProps & AddressSliceProps>()((...a) => ({
  ...createCartSlice(...a),
  ...createAddressSlice(...a),
}))

export { useStore }
