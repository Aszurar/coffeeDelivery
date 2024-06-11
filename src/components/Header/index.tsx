import { Flex, HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import Logo from '@/assets/icons/logo.svg'

import { AddressButton } from './AddressButton'
import { CartButton } from './CartButton'

export function Header() {
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
        <AddressButton />
        <CartButton />
      </HStack>
    </Flex>
  )
}
