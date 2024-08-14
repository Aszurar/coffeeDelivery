import { beforeEach, describe, expect, it } from 'vitest'

import { useAddressStore as addressStore } from '..'
import { AddressProps } from '../address'

const initialState = addressStore.getState()

describe('Address Store', () => {
  beforeEach(() => {
    addressStore.setState(initialState)
  })
  // add new address
  it('should add a new address', () => {
    const { addNewAddress } = addressStore.getState()

    const newAddress = {
      id: '1',
      city: 'New York',
      street: 'Wall Street',
      number: 123,
      cep: '12345-678',
      neighborhood: 'Manhattan',
      uf: 'NY',
      complement: 'Apartment 123',
    } as AddressProps

    addNewAddress(newAddress)

    const { addresses, totalAddresses, selectedAddress } =
      addressStore.getState()

    expect(addresses).toEqual([newAddress])
    expect(totalAddresses).toBe(1)
    expect(selectedAddress).toEqual(newAddress)
  })

  it("shouldn't add more than 10 addresses", () => {
    const { addNewAddress } = addressStore.getState()

    try {
      for (let i = 0; i < 11; i++) {
        addNewAddress({
          id: i.toString(),
          city: 'New York',
          street: 'Wall Street',
          number: 123,
          cep: '12345-678',
          neighborhood: 'Manhattan',
          uf: 'NY',
          complement: 'Apartment 123',
        } as AddressProps)
      }
    } catch (error) {
      console.log("shouldn't add more than 10 addresses:", error)
    }

    const { addresses, totalAddresses } = addressStore.getState()

    expect(addresses.length).toBe(10)
    expect(totalAddresses).toBe(10)
  })

  // select address /
  it('should add more than one address and the last one should be selected', () => {
    const { addNewAddress } = addressStore.getState()

    const firstAddress = {
      id: '1',
      city: 'New York',
      street: 'Wall Street',
      number: 123,
      cep: '12345-678',
      neighborhood: 'Manhattan',
      uf: 'NY',
      complement: 'Apartment 123',
    } as AddressProps

    const secondAddress = {
      id: '2',
      city: 'Los Angeles',
      street: 'Hollywood Boulevard',
      number: 456,
      cep: '98765-432',
      neighborhood: 'Hollywood',
      uf: 'CA',
      complement: 'Apartment 456',
    } as AddressProps

    addNewAddress(firstAddress)
    addNewAddress(secondAddress)

    const { addresses, totalAddresses, selectedAddress } =
      addressStore.getState()

    expect(addresses).toEqual([firstAddress, secondAddress])
    expect(totalAddresses).toBe(2)
    expect(selectedAddress).toEqual(secondAddress)
  })

  it('should select an address', () => {
    const { addNewAddress, selectAddress } = addressStore.getState()

    const firstAddress = {
      id: '1',
      city: 'New York',
      street: 'Wall Street',
      number: 123,
      cep: '12345-678',
      neighborhood: 'Manhattan',
      uf: 'NY',
      complement: 'Apartment 123',
    } as AddressProps

    const secondAddress = {
      id: '2',
      city: 'Los Angeles',
      street: 'Hollywood Boulevard',
      number: 456,
      cep: '98765-432',
      neighborhood: 'Hollywood',
      uf: 'CA',
      complement: 'Apartment 456',
    } as AddressProps

    addNewAddress(firstAddress)
    addNewAddress(secondAddress)

    selectAddress(firstAddress.id)

    const { selectedAddress } = addressStore.getState()

    expect(selectedAddress).toEqual(firstAddress)
  })

  // incomplete address
  it('should add an incomplete address', () => {
    const { addIncompleteAddressOnSelectedAddress } = addressStore.getState()

    const incompleteAddress = {
      city: 'New York',
      street: 'Wall Street',
      cep: '12345-678',
      neighborhood: 'Manhattan',
      uf: 'NY',
    } as AddressProps

    addIncompleteAddressOnSelectedAddress(incompleteAddress)

    const { incompleteAddress: incompleteAddressState } =
      addressStore.getState()

    expect(incompleteAddressState).toEqual(incompleteAddress)
  })

  it('should clean the incomplete address', () => {
    const { addIncompleteAddressOnSelectedAddress, cleanIncompleteAddress } =
      addressStore.getState()

    const incompleteAddress = {
      city: 'New York',
      street: 'Wall Street',
      cep: '12345-678',
      neighborhood: 'Manhattan',
      uf: 'NY',
    } as AddressProps

    addIncompleteAddressOnSelectedAddress(incompleteAddress)

    cleanIncompleteAddress()

    const { incompleteAddress: incompleteAddressState } =
      addressStore.getState()

    expect(incompleteAddressState).toBeUndefined()
  })

  // update address
  it('should update an address', () => {
    const { addNewAddress, updateAddress } = addressStore.getState()

    const firstAddress = {
      id: '1',
      city: 'New York',
      street: 'Wall Street',
      number: 123,
      cep: '12345-678',
      neighborhood: 'Manhattan',
      uf: 'NY',
      complement: 'Apartment 123',
    } as AddressProps

    const secondAddress = {
      id: '2',
      city: 'Los Angeles',
      street: 'Hollywood Boulevard',
      number: 456,
      cep: '98765-432',
      neighborhood: 'Hollywood',
      uf: 'CA',
      complement: 'Apartment 456',
    } as AddressProps

    addNewAddress(firstAddress)
    addNewAddress(secondAddress)

    const updatedAddress = {
      id: '2',
      city: 'João Pessoa',
      street: 'Rua da Aurora',
      number: 456,
      cep: '98765-432',
      neighborhood: 'Centro',
      uf: 'PB',
      complement: 'Apartment 456',
    } as AddressProps

    updateAddress(updatedAddress)

    const { addresses } = addressStore.getState()

    expect(addresses).toEqual([firstAddress, updatedAddress])
  })

  it("shouldn't update an address that doesn't exist", () => {
    const { updateAddress } = addressStore.getState()

    const updatedAddress = {
      id: '2',
      city: 'João Pessoa',
      street: 'Rua da Aurora',
      number: 456,
      cep: '98765-432',
      neighborhood: 'Centro',
      uf: 'PB',
      complement: 'Apartment 456',
    } as AddressProps

    updateAddress(updatedAddress)

    const { addresses } = addressStore.getState()

    expect(addresses).toEqual([])
  })

  // remove address
  it('should remove an address', () => {
    const { addNewAddress, removeAddress } = addressStore.getState()

    const firstAddress = {
      id: '1',
      city: 'New York',
      street: 'Wall Street',
      number: 123,
      cep: '12345-678',
      neighborhood: 'Manhattan',
      uf: 'NY',
      complement: 'Apartment 123',
    } as AddressProps

    const secondAddress = {
      id: '2',
      city: 'Los Angeles',
      street: 'Hollywood Boulevard',
      number: 456,
      cep: '98765-432',
      neighborhood: 'Hollywood',
      uf: 'CA',
      complement: 'Apartment 456',
    } as AddressProps

    addNewAddress(firstAddress)
    addNewAddress(secondAddress)

    removeAddress(firstAddress.id)

    const { addresses, totalAddresses } = addressStore.getState()

    expect(addresses).toEqual([secondAddress])
    expect(totalAddresses).toBe(1)
  })

  it("should be able to remove the unique address and the selected address should be 'undefined'", () => {
    const { addNewAddress, removeAddress } = addressStore.getState()

    const firstAddress = {
      id: '1',
      city: 'New York',
      street: 'Wall Street',
      number: 123,
      cep: '12345-678',
      neighborhood: 'Manhattan',
      uf: 'NY',
      complement: 'Apartment 123',
    } as AddressProps

    addNewAddress(firstAddress)

    removeAddress(firstAddress.id)

    const { addresses, totalAddresses, selectedAddress } =
      addressStore.getState()

    expect(addresses).toEqual([])
    expect(totalAddresses).toBe(0)
    expect(selectedAddress).toBeUndefined()
  })

  it('should be able to select other address when the selected address is removed', () => {
    const { addNewAddress, removeAddress } = addressStore.getState()

    const firstAddress = {
      id: '1',
      city: 'New York',
      street: 'Wall Street',
      number: 123,
      cep: '12345-678',
      neighborhood: 'Manhattan',
      uf: 'NY',
      complement: 'Apartment 123',
    } as AddressProps

    const secondAddress = {
      id: '2',
      city: 'Los Angeles',
      street: 'Hollywood Boulevard',
      number: 456,
      cep: '98765-432',
      neighborhood: 'Hollywood',
      uf: 'CA',
      complement: 'Apartment 456',
    } as AddressProps

    addNewAddress(firstAddress)
    addNewAddress(secondAddress)

    const { selectedAddress, addresses: oldAddresses } = addressStore.getState()
    let expectedNewSelectedAddress

    if (selectedAddress) {
      // select the expected address to be selected after removing the selected address
      expectedNewSelectedAddress = oldAddresses.find(
        (address) => address.id !== selectedAddress.id,
      )

      removeAddress(selectedAddress.id)
    }

    const { selectedAddress: newSelectedAddress, addresses } =
      addressStore.getState()

    expect(newSelectedAddress).toEqual(expectedNewSelectedAddress)
    expect(addresses).toHaveLength(1)
  })

  // delete all addresses
  it('should delete all addresses', () => {
    const { addNewAddress, deleteAllAddresses } = addressStore.getState()

    const firstAddress = {
      id: '1',
      city: 'New York',
      street: 'Wall Street',
      number: 123,
      cep: '12345-678',
      neighborhood: 'Manhattan',
      uf: 'NY',
      complement: 'Apartment 123',
    } as AddressProps

    const secondAddress = {
      id: '2',
      city: 'Los Angeles',
      street: 'Hollywood Boulevard',
      number: 456,
      cep: '98765-432',
      neighborhood: 'Hollywood',
      uf: 'CA',
      complement: 'Apartment 456',
    } as AddressProps

    addNewAddress(firstAddress)
    addNewAddress(secondAddress)

    deleteAllAddresses()

    const { addresses, totalAddresses, selectedAddress } =
      addressStore.getState()

    expect(addresses).toEqual([])
    expect(totalAddresses).toBe(0)
    expect(selectedAddress).toBeUndefined()
  })
})
