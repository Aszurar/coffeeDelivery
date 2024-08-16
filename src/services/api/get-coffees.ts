import { CoffeeTypesProps } from '@/dto/coffee'

import { api } from '../api'

export async function getCoffees() {
  const response = await api.get<CoffeeTypesProps[]>('/coffees')

  return response.data
}
