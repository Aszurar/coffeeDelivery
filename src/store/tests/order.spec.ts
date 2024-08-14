import { beforeEach, describe, expect, it } from 'vitest'

import { IOrder } from '@/dto/order'
import { PAYMENT_TYPE } from '@/dto/payment'

import { useOrderStore as orderStore } from '..'

const initialState = orderStore.getState()

describe('Order Store', () => {
  // Reset the state before each test
  beforeEach(() => {
    orderStore.setState(initialState)
  })

  // add new order
  it('should add a new order', () => {
    const { updateCurrentOrder } = orderStore.getState()

    const newOrder = {
      id: '1',
      price: 7,
      paymentType: PAYMENT_TYPE.CREDIT_CARD,
      address: {
        id: '1',
        city: 'New York',
        street: 'Wall Street',
        number: 123,
        cep: '12345-678',
        neighborhood: 'Manhattan',
        uf: 'NY',
        complement: 'Apartment 123',
      },
      createdAt: new Date(),
    } as IOrder

    updateCurrentOrder(newOrder)

    const { currentOrder } = orderStore.getState()

    expect(currentOrder).toEqual(newOrder)
  })

  // update order
  it('should update an existing order', () => {
    const { updateCurrentOrder } = orderStore.getState()

    const newOrder = {
      id: '1',
      price: 7,
      paymentType: PAYMENT_TYPE.CREDIT_CARD,
      address: {
        id: '1',
        city: 'New York',
        street: 'Wall Street',
        number: 123,
        cep: '12345-678',
        neighborhood: 'Manhattan',
        uf: 'NY',
        complement: 'Apartment 123',
      },
      createdAt: new Date(),
    } as IOrder

    updateCurrentOrder(newOrder)

    const updatedOrder = {
      id: '2',
      price: 25,
      paymentType: PAYMENT_TYPE.DEBIT_CARD,
      address: {
        id: '1',
        city: 'João Pessoa',
        street: 'Epitácio Pessoa',
        number: 50,
        cep: '12345-678',
        neighborhood: 'Bessa',
        uf: 'PB',
        complement: 'Apartamento 123',
      },
      createdAt: new Date(),
    } as IOrder

    updateCurrentOrder(updatedOrder)

    const { currentOrder } = orderStore.getState()

    expect(currentOrder).toEqual(updatedOrder)
  })
})
