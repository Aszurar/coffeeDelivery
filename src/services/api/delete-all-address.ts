import { AddressProps } from '@/store/address'

import { deleteAddressById } from './delete-address-by-id'

type DeleteAllAddressProps = {
  addresses: AddressProps[]
}
export async function deleteAllAddress({ addresses }: DeleteAllAddressProps) {
  for (const address of addresses) {
    await deleteAddressById({ id: address.id })
  }
}
