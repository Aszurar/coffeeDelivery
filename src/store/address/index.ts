import { produce } from 'immer'
import { StateCreator } from 'zustand'

import { RegisterAddressFormProps } from '@/components/Form/RegisterAddressForm/validation'

export type AddressProps = RegisterAddressFormProps & {
  id: string
}

type IncompleteAddressProps = Omit<AddressProps, 'number' | 'complement'>

type IncompleteAddress = Omit<AddressProps, 'id' | 'complement' | 'number'>

type AddressStoreProps = {
  addresses: AddressProps[]
  totalAddresses: number
  maxAddresses: number
  selectedAddress: AddressProps | undefined
  incompleteAddress: IncompleteAddressProps | undefined
  isAddressLoading: boolean
  setAddressLoading: (isLoading: boolean) => void
  loadAddresses: (addresses: AddressProps[]) => void
  loadSelectedAddress: (address?: AddressProps) => void
  updateAddress: (address: AddressProps) => void
  removeAddress: (id: string) => void
  addIncompleteAddressOnSelectedAddress: (address: IncompleteAddress) => void
  cleanIncompleteAddress: () => void
  deleteAllAddresses: () => void
}

const createAddressStore: StateCreator<AddressStoreProps> = (set) => ({
  addresses: [],
  totalAddresses: 0,
  maxAddresses: 10,
  selectedAddress: undefined,
  incompleteAddress: undefined,
  isAddressLoading: false,
  setAddressLoading: (isLoading: boolean) => {
    console.log('isLoading salvando', isLoading)
    set({ isAddressLoading: isLoading })
  },
  loadAddresses: (addresses: AddressProps[]) => {
    set({
      addresses,
      totalAddresses: addresses.length,
    })
  },
  loadSelectedAddress: (address?: AddressProps) => {
    const isAddressEmpty = address ? Object.keys(address).length === 0 : true

    if (isAddressEmpty) {
      set({
        selectedAddress: undefined,
      })
    } else {
      set({
        selectedAddress: address,
      })
    }
  },

  addIncompleteAddressOnSelectedAddress: (address: IncompleteAddress) => {
    set(
      produce((state: AddressStoreProps) => {
        state.incompleteAddress = {
          ...address,
        } as AddressProps
      }),
    )
  },
  cleanIncompleteAddress: () => {
    set(
      produce((state: AddressStoreProps) => {
        state.incompleteAddress = undefined
      }),
    )
  },
  updateAddress: (address) => {
    set(
      produce((state: AddressStoreProps) => {
        let selectedAddress

        const updatedAddressesList = state.addresses.map((currentAddress) =>
          currentAddress.id === address.id ? address : currentAddress,
        )

        if (state.selectedAddress?.id === address.id) {
          selectedAddress = address
        }

        state.addresses = updatedAddressesList
        state.selectedAddress = selectedAddress
      }),
    )
  },
  removeAddress: (id) => {
    set(
      produce((state: AddressStoreProps) => {
        let selectedAddress

        const addressAfterRemove = state.addresses.filter(
          (address) => address.id !== id,
        )
        // Select the last address if there is no address selected
        if (state.selectedAddress?.id === id) {
          if (addressAfterRemove.length > 0) {
            selectedAddress = addressAfterRemove[addressAfterRemove.length - 1]
          }
        }

        state.addresses = addressAfterRemove
        state.totalAddresses = addressAfterRemove.length
        state.selectedAddress = selectedAddress
      }),
    )
  },
  deleteAllAddresses: () => {
    set({ addresses: [], totalAddresses: 0, selectedAddress: undefined })
  },
})

export type { AddressStoreProps }
export { createAddressStore }
