const priceFormatter = new Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  style: 'decimal',
  minimumFractionDigits: 2,
})

export { priceFormatter }
