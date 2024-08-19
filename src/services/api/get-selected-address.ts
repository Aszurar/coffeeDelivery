import { AddressProps } from '@/store/address'

import { api } from '../api'

export async function getSelectedAddresses() {
  const response = await api.get<AddressProps>('/selected-address')

  return response.data
}
