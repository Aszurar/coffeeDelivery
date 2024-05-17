const priceFormatter = new Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  style: 'decimal',
  minimumFractionDigits: 2,
})

const priceFormatterWithCurrency = new Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  style: 'currency',
  minimumFractionDigits: 2,
})

export { priceFormatter, priceFormatterWithCurrency }
