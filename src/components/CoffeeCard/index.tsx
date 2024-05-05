import {
  Badge,
  Center,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react'

import TradicionalExpressPNG from '@/assets/images/coffees/expresso-tradicional.png'
import { ShoppingCart } from '@phosphor-icons/react'
import { Counter } from '../Counter'

export function CoffeeCard() {
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
        src={TradicionalExpressPNG}
        alt="Café Expresso Tradicional"
        w="7.5rem"
        h="7.5rem"
        fit="contain"
        alignSelf="center"
        mt="-1.25rem"
      />
      <Center mt="0.75rem" flexDir="column">
        <Badge
          px="0.5rem"
          py="0.25rem"
          bg="yellow.200"
          color="yellow.750"
          variant="subtle"
          rounded="full"
          fontSize="x-small"
        >
          Tradicional
        </Badge>

        <Center flexDir="column" mt="1rem" gap="0.5rem">
          <Heading fontSize="xl" color="gray.800">
            Expresso Tradicional
          </Heading>
          <Text fontSize="sm" textAlign="center" color="gray.600">
            O tradicional café feito com água quente e grãos moídos
          </Text>
        </Center>

        <Center mt="2rem">
          <Flex alignItems="flex-end" gap="2px" mr="1.5rem">
            <Text fontSize="sm">R$</Text>
            <Heading fontSize="2xl" fontWeight="800" color="gray.800">
              9,90
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
