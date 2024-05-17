import ArabicPNG from '@/assets/images/coffees/arabe.png'
import CoffeeWithMilkPNG from '@/assets/images/coffees/cafe-com-leite.png'
import CappuccinoPNG from '@/assets/images/coffees/capuccino.png'
import HotChocolatePNG from '@/assets/images/coffees/chocolate-quente.png'
import CubanPNG from '@/assets/images/coffees/cubano.png'
import AmericanExpressPNG from '@/assets/images/coffees/expresso-americano.png'
import CreamExpressPNG from '@/assets/images/coffees/expresso-cremoso.png'
import IcedExpressPNG from '@/assets/images/coffees/expresso-gelado.png'
import TradicionalExpressPNG from '@/assets/images/coffees/expresso-tradicional.png'
import HawaiianPNG from '@/assets/images/coffees/havaiano.png'
import IrishPNG from '@/assets/images/coffees/irlandes.png'
import LattePNG from '@/assets/images/coffees/latte.png'
import MacchiatoPNG from '@/assets/images/coffees/macchiato.png'
import MocaccinoPNG from '@/assets/images/coffees/mocaccino.png'

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

const COFFEE_TYPES: CoffeeTypesProps[] = [
  {
    id: '1',
    name: 'Expresso Tradicional',
    description: 'O tradicional café feito com água quente e grãos moídos',
    tag: ['TRADICIONAL'],
    price: 2.5,
    image: TradicionalExpressPNG,
  },

  {
    id: '2',
    name: 'Expresso Americano',
    description: 'Expresso diluído, menos intenso que o tradicional',
    tag: ['TRADICIONAL'],
    price: 2.0,
    image: AmericanExpressPNG,
  },

  {
    id: '3',
    name: 'Expresso Cremoso',
    description: 'Café expresso tradicional com espuma cremosa',
    tag: ['TRADICIONAL'],
    price: 2.25,
    image: CreamExpressPNG,
  },

  {
    id: '4',
    name: 'Expresso Gelado',
    description: 'Bebida "p"reparada com café expresso e cubos de gelo',
    tag: ['TRADICIONAL', 'GELADO'],
    price: 2.5,
    image: IcedExpressPNG,
  },

  {
    id: '5',
    name: 'Café com Leite',
    description: 'Meio a meio de expresso tradicional com leite vaporizado',
    tag: ['TRADICIONAL', 'COM LEITE'],
    price: 3.0,
    image: CoffeeWithMilkPNG,
  },

  {
    id: '6',
    name: 'Latte',
    description:
      'Uma dose de café expresso com o dobro de leite e espuma cremosa',
    tag: ['TRADICIONAL', 'COM LEITE'],
    price: 3.5,
    image: LattePNG,
  },

  {
    id: '7',
    name: 'Capuccino',
    description:
      'Bebida "c"om canela feita de doses iguais de café, leite e espuma',
    tag: ['TRADICIONAL', 'COM LEITE'],
    price: 4.5,
    image: CappuccinoPNG,
  },

  {
    id: '8',
    name: 'Macchiato',
    description:
      'Café expresso misturado com um pouco de leite quente e espuma',
    tag: ['TRADICIONAL', 'ALCOÓLICO', 'GELADO'],
    price: 4,
    image: MacchiatoPNG,
  },

  {
    id: '9',
    name: 'Mocaccino',
    description: 'Café expresso com calda de chocolate, pouco leite e espuma',
    tag: ['TRADICIONAL', 'COM LEITE'],
    price: 5,
    image: MocaccinoPNG,
  },

  {
    id: '10',
    name: 'Chocolate Quente',
    description: 'Bebida feita com chocolate dissolvido no leite quente e café',
    tag: ['ESPECIAL', 'COM LEITE'],
    price: 7,
    image: HotChocolatePNG,
  },

  {
    id: '11',
    name: 'Havaiano',
    description: 'Bebida adocicada preparada com café e leite de coco',
    tag: ['ESPECIAL'],
    price: 10,
    image: HawaiianPNG,
  },

  {
    id: '12',
    name: 'Árabe',
    description: 'Bebida preparada com grãos de café árabe e especiarias',
    tag: ['ESPECIAL'],
    price: 11,
    image: ArabicPNG,
  },

  {
    id: '13',
    name: 'Cubano',
    description:
      'Drink gelado de café expresso com rum, creme de leite e hortelã',
    tag: ['ESPECIAL', 'ALCOÓLICO', 'GELADO'],
    price: 12,
    image: CubanPNG,
  },

  {
    id: '14',
    name: 'Irlandês',
    description: 'Bebida a base de café, uísque irlandês, açúcar e chantilly',
    tag: ['ESPECIAL', 'ALCOÓLICO'],
    price: 15,
    image: IrishPNG,
  },
]

export type { CoffeeTagsType, CoffeeTypesProps }
export { COFFEE_TYPES }
