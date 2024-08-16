type CoffeeTagsType =
  | 'TRADICIONAL'
  | 'GELADO'
  | 'COM LEITE'
  | 'ESPECIAL'
  | 'ALCOÓLICO'

type CoffeeTypesProps = {
  id: string
  name: string
  description: string
  tag: CoffeeTagsType[]
  price: number
  image: string
}

export type { CoffeeTagsType, CoffeeTypesProps }
