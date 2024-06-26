import { produce } from 'immer'
import { StateCreator } from 'zustand'

import { PAYMENT_TYPE, PaymentTypeValues } from '@/dto/payment'

type PaymentStoreProps = {
  paymentType: PaymentTypeValues
  updatePaymentType: (paymentType: PaymentTypeValues) => void
}

const createPaymentStore: StateCreator<PaymentStoreProps> = (set) => ({
  paymentType: PAYMENT_TYPE.EMPTY,
  updatePaymentType: (paymentType) => {
    set(
      produce((state: PaymentStoreProps) => {
        state.paymentType = paymentType
      }),
    )
  },
})

export type { PaymentStoreProps }
export { createPaymentStore }
