import { Skeleton } from '@chakra-ui/react'

export function CoffeeCardSkeleton() {
  return (
    <Skeleton
      w="64"
      h="19.375rem"
      px="5"
      pb="5"
      bg="white"
      rounded="md"
      shadow="md"
      borderWidth="1px"
      display="flex"
      flexDir="column"
      borderTopLeftRadius="md"
      borderTopRightRadius="36px"
      borderBottomRightRadius="md"
      borderBottomLeftRadius="36px"
    />
  )
}
