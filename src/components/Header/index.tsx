import { Button, Flex, HStack, IconButton, useToken } from '@chakra-ui/react'
import { MapPin, ShoppingCart } from '@phosphor-icons/react'

import Logo from '@/assets/icons/logo.svg'

export function Header() {
  const [purple500, yellow700] = useToken('colors', [
    'purple.500',
    'yellow.700',
  ])

  return (
    <Flex
      as="header"
      h="6.625rem"
      w="100%"
      px="4"
      mx="auto"
      align="center"
      maxWidth="5xl.5"
      justify="space-between"
    >
      <img src={Logo} alt="Coffee Delivery" />

      <HStack spacing="3">
        <Button
          p="2"
          h="fit-content"
          rounded="md"
          fontSize="sm"
          bg="purple.200"
          color="purple.700"
          fontWeight={400}
          leftIcon={
            <MapPin weight="fill" color={purple500} width={22} height={22} />
          }
          _hover={{
            bg: 'purple.100',
          }}
          _active={{
            bg: 'purple.200',
          }}
        >
          João Pessoa, PB
        </Button>

        <IconButton
          p="2"
          h="fit-content"
          rounded="md"
          aria-label="Carrinho de compras"
          bg="yellow.200"
          _hover={{
            bg: 'yellow.300',
          }}
          _active={{
            bg: 'yellow.200',
          }}
          icon={
            <ShoppingCart
              width={22}
              height={22}
              weight="fill"
              color={yellow700}
            />
          }
        />
      </HStack>
    </Flex>
  )
}
