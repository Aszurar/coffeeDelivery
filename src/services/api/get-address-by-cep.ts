import { AxiosError } from 'axios'

import { ICepAddressBrasilAPI } from '@/dto/address'
import { AppError } from '@/errors'

import { cepApi } from '../api'

type GetAddressByCep = {
  cep: string
}

export async function getAddressByCep({ cep }: GetAddressByCep) {
  try {
    const response = await cepApi.get<ICepAddressBrasilAPI>(
      `/api/cep/v1/${cep}`,
    )
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new AppError(error.response?.data.message)
    }

    throw new Error('Erro desconhecido ao buscar o CEP')
  }
}
