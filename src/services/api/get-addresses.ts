import { AddressProps } from '@/store/address'

import { api } from '../api'

export async function getAddresses() {
  const response = await api.get<AddressProps[]>('/addresses')

  return response.data
}
