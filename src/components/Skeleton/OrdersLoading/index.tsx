import { OrderCardSkeleton } from './OrderCardSkeleton'

export function OrdersLoading() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((key) => (
    <OrderCardSkeleton key={key} />
  ))
}
