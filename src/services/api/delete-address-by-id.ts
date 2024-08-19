import { api } from '../api'

type DeleteAddressProps = {
  id: string
}

export async function deleteAddressById({ id }: DeleteAddressProps) {
  await api.delete(`/addresses/${id}`)
}
