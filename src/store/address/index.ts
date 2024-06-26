import { produce } from 'immer'
import { StateCreator } from 'zustand'

import { RegisterAddressFormProps } from '@/components/Form/RegisterAddressForm/validation'
import { AppError } from '@/errors'

export type AddressProps = RegisterAddressFormProps & {
  id: string
}

type IncompleteAddress = Omit<AddressProps, 'id' | 'complement' | 'number'>

type AddressStoreProps = {
  addresses: AddressProps[]
  totalAddresses: number
  maxAddresses: number
  selectedAddress: AddressProps | undefined
  addNewAddress: (address: AddressProps) => void
  selectAddress: (id: string) => void
  updateAddress: (address: AddressProps) => void
  removeAddress: (id: string) => void
  addIncompleteAddressOnSelectedAddress: (address: IncompleteAddress) => void
  deleteAllAddresses: () => void
}

const createAddressStore: StateCreator<AddressStoreProps> = (set, get) => ({
  addresses: [],
  totalAddresses: 0,
  maxAddresses: 10,
  selectedAddress: undefined,
  addNewAddress: (address) => {
    const { addresses: currentAddresses, maxAddresses } = get()

    if (currentAddresses.length >= maxAddresses) {
      throw new AppError(
        `Você atingiu o limite de ${maxAddresses} endereços cadastrados.`,
        'Para adicionar um novo endereço, remova um dos endereços já cadastrados.',
      )
    }

    const addressesListWithNewAddress = [...currentAddresses, address]

    set({
      addresses: addressesListWithNewAddress,
      totalAddresses: addressesListWithNewAddress.length,
      selectedAddress: address,
    })
  },
  selectAddress: (id) => {
    set(
      produce((state: AddressStoreProps) => {
        const selectedAddress = state.addresses.find(
          (address) => address.id === id,
        )

        state.selectedAddress = selectedAddress
      }),
    )
  },
  addIncompleteAddressOnSelectedAddress: (address: IncompleteAddress) => {
    set(
      produce((state: AddressStoreProps) => {
        state.selectedAddress = {
          ...address,
        } as AddressProps
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
