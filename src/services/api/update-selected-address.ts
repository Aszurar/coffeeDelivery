import { AddressProps } from '@/store/address'

import { api } from '../api'

type RegisterAddressProps = {
  address?: AddressProps
}

export async function updateSelectedAddress({ address }: RegisterAddressProps) {
  await api.put('/selected-address', address)
}
