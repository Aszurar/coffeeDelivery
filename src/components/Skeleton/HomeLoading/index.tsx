import { CoffeeCardSkeleton } from './CoffeeCardSkeleton'

export function HomeLoading() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((key) => (
    <CoffeeCardSkeleton key={key} />
  ))
}
