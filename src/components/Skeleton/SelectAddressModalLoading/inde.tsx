import { AddressCardSkeleton } from './AddressCardLoading'

export function SelectAddressModalLoading() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((key) => (
    <AddressCardSkeleton key={key} />
  ))
}
