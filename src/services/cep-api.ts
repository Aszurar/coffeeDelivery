import axios from 'axios'

export const cepApi = axios.create({
  baseURL: 'https://brasilapi.com.br/',
})
