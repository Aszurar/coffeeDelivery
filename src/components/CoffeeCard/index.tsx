import {
  Badge,
  Center,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react'

import { ShoppingCart } from '@phosphor-icons/react'
import { Counter } from '../Counter'
import { CoffeeTagsType } from '@/dto/coffee'
import { priceFormatter } from '@/utils/number'

type CoffeeCardProps = {
  id: number
  name: string
  description: string
  tag: CoffeeTagsType[]
  price: number
  image: string
}

export function CoffeeCard(coffee: CoffeeCardProps) {
  const price = priceFormatter.format(coffee.price)
  return (
    <Flex
      w="16rem"
      h="19.375rem"
      px="1.25rem"
      pb="1.25rem"
      bg="gray.200"
      flexDir="column"
      borderTopLeftRadius="6px"
      borderTopRightRadius="36px"
      borderBottomRightRadius="6px"
      borderBottomLeftRadius="36px"
    >
      <Image
        src={coffee.image}
        alt="Café Expresso Tradicional"
        w="7.5rem"
        h="7.5rem"
        fit="contain"
        alignSelf="center"
        mt="-1.25rem"
      />
      <Center mt="0.75rem" flexDir="column">
        <Flex gap="0.25rem">
          {coffee.tag.map((tag) => (
            <Badge
              key={tag}
              px="0.5rem"
              py="0.25rem"
              bg="yellow.200"
              color="yellow.750"
              variant="subtle"
              rounded="full"
              fontSize="x-small"
            >
              {tag}
            </Badge>
          ))}
        </Flex>

        <Center flexDir="column" mt="1rem" gap="0.5rem">
          <Heading fontSize="xl" color="gray.800">
            {coffee.name}
          </Heading>
          <Text fontSize="sm" textAlign="center" color="gray.600">
            {coffee.description}
          </Text>
        </Center>

        <Center mt="2rem">
          <Flex alignItems="flex-end" gap="4px" mr="1.5rem">
            <Text fontSize="sm">R$</Text>
            <Heading fontSize="2xl" fontWeight="800" color="gray.800">
              {price}
            </Heading>
          </Flex>

          <Counter />

          <IconButton
            w="2.375rem"
            minW="2.375rem"
            h="2.375rem"
            ml="0.5rem"
            rounded="md"
            color="white"
            bg="purple.700"
            _hover={{
              bg: 'purple.500',
            }}
            _active={{
              bg: 'purple.700',
            }}
            aria-label="Adicionar ao carrinho de compras"
            icon={<ShoppingCart width={22} height={22} weight="fill" />}
          />
        </Center>
      </Center>
    </Flex>
  )
}
