import axios from 'axios'

export const cepApi = axios.create({
  baseURL: 'https://brasilapi.com.br/',
})

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
})
