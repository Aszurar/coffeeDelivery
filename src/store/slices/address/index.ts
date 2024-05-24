import { StateCreator } from 'zustand'

import { RegisterAddressFormProps } from '@/components/Form/RegisterAddressForm/validation'
import { AppError } from '@/errors'

export type AddressProps = RegisterAddressFormProps & {
  id: string
  isSelected: boolean
}

type AddressSliceProps = {
  addresses: AddressProps[]
  totalAddresses: number
  maxAddresses: number
  addNewAddress: (address: AddressProps) => void
  getTheSelectedAddress: () => AddressProps | undefined
  selectAddress: (id: string) => void
  updateAddress: (address: AddressProps) => void
  removeAddress: (id: string) => void
  deleteAllAddress: () => void
}

const createAddressSlice: StateCreator<AddressSliceProps> = (set, get) => ({
  addresses: [],
  totalAddresses: 0,
  maxAddresses: 10,
  addNewAddress: (address) => {
    const { addresses: currentAddresses, maxAddresses } = get()

    if (currentAddresses.length >= maxAddresses) {
      throw new AppError(
        `Você atingiu o limite de ${maxAddresses} endereços cadastrados.`,
        'Para adicionar um novo endereço, remova um dos endereços já cadastrados.',
      )
    }

    const unSelectOlderAddresses = currentAddresses.map((currentAddress) => ({
      ...currentAddress,
      isSelected: false,
    }))

    set({ addresses: [...unSelectOlderAddresses, address] })
    set({ totalAddresses: ++currentAddresses.length })
  },
  getTheSelectedAddress: () => {
    const { addresses } = get()

    if (addresses.length > 0) {
      const selectedAddress = addresses.find((address) => address.isSelected)

      if (!selectedAddress) {
        const lastIndexAddresses = addresses.length - 1

        const updatedAddresses = addresses.map((address, index) => ({
          ...address,
          isSelected: index === lastIndexAddresses,
        }))

        set({ addresses: updatedAddresses })

        const lastAddress = updatedAddresses[lastIndexAddresses]

        return lastAddress
      }

      return selectedAddress
    }

    return undefined
  },
  selectAddress: (id) => {
    const { addresses: currentAddresses } = get()
    const updatedAddresses = currentAddresses.map((currentAddress) => ({
      ...currentAddress,
      isSelected: currentAddress.id === id,
    }))
    set({ addresses: updatedAddresses })
  },
  updateAddress: (address) => {
    const { addresses: currentAddress } = get()
    const updatedAddress = currentAddress.map((currentAddress) =>
      currentAddress.id === address.id ? address : currentAddress,
    )
    set({ addresses: updatedAddress })
  },
  removeAddress: (id) => {
    const { addresses: currentAddresses } = get()
    const updatedAddress = currentAddresses.filter(
      (address) => address.id !== id,
    )
    set({ addresses: updatedAddress })
    set({ totalAddresses: --currentAddresses.length })
  },
  deleteAllAddress: () => {
    set({ addresses: [] })
    set({ totalAddresses: 0 })
  },
})

export type { AddressSliceProps }
export { createAddressSlice }
