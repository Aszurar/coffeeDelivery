import { Button, Flex, HStack, useToken } from '@chakra-ui/react'
import { MapPin } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

import Logo from '@/assets/icons/logo.svg'

import { CartButton } from './CartButton'

export function Header() {
  const [purple500] = useToken('colors', ['purple.500'])

  return (
    <Flex
      as="header"
      h="6.625rem"
      w="100%"
      py="8"
      align="center"
      justify="space-between"
    >
      <Link to="/">
        <img src={Logo} alt="Coffee Delivery" />
      </Link>

      <HStack spacing="3">
        <Button
          p="2"
          h="fit-content"
          rounded="md"
          fontSize="sm"
          fontWeight={400}
          bg="purple.200"
          color="purple.700"
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

        <CartButton />
      </HStack>
    </Flex>
  )
}
