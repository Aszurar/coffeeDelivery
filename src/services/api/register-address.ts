import { AddressProps } from '@/store/address'

import { api } from '../api'

type RegisterAddressProps = {
  address: AddressProps
}

export async function registerAddress({ address }: RegisterAddressProps) {
  await api.post('/addresses', address)
}
