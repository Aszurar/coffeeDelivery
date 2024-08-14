import { beforeEach, describe, expect, it } from 'vitest'

import { PAYMENT_TYPE } from '@/dto/payment'

import { usePaymentStore as paymentStore } from '..'

const initialState = paymentStore.getState()

describe('Payment Store', () => {
  beforeEach(() => {
    paymentStore.setState(initialState)
  })

  it("should able to update the payment's type", () => {
    const { updatePaymentType } = paymentStore.getState()

    updatePaymentType(PAYMENT_TYPE.DEBIT_CARD)

    const { paymentType } = paymentStore.getState()

    expect(paymentType).toBe(PAYMENT_TYPE.DEBIT_CARD)
  })

  it("should able to update the payment's type more than once", () => {
    const { updatePaymentType } = paymentStore.getState()

    updatePaymentType(PAYMENT_TYPE.DEBIT_CARD)
    updatePaymentType(PAYMENT_TYPE.CREDIT_CARD)

    const { paymentType } = paymentStore.getState()

    expect(paymentType).toBe(PAYMENT_TYPE.CREDIT_CARD)
  })
})
