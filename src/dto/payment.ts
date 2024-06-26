enum PAYMENT_TYPE {
  EMPTY = 0,
  CREDIT_CARD = 1,
  MONEY = 2,
  DEBIT_CARD = 3,
}

const PAYMENT_TYPE_VALUES = {
  0: 'Não selecionado',
  1: 'Cartão de crédito',
  2: 'Dinheiro',
  3: 'Cartão de débito',
}

type PaymentTypeValues = (typeof PAYMENT_TYPE)[keyof typeof PAYMENT_TYPE]

export { PAYMENT_TYPE, PAYMENT_TYPE_VALUES }
export type { PaymentTypeValues }
