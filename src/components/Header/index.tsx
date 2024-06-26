import { Button, Flex, HStack } from '@chakra-ui/react'
import { Receipt } from '@phosphor-icons/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Logo from '@/assets/icons/logo.svg'
import { ROUTES } from '@/router/routes'

import { AddressButton } from './AddressButton'
import { CartButton } from './CartButton'

export function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
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
          variant="ghost"
          p="2"
          h="fit-content"
          rounded="md"
          fontSize="sm"
          fontWeight={400}
          colorScheme="purple"
          isActive={pathname === ROUTES.ORDER_HISTORIC}
          onClick={() => navigate(ROUTES.ORDER_HISTORIC)}
          leftIcon={<Receipt weight="fill" width={22} height={22} />}
          _hover={{
            bg: 'purple.100',
          }}
          _active={{
            fontWeight: 700,
            bg: 'purple.200',
          }}
        >
          Pedidos
        </Button>
        <AddressButton />
        <CartButton />
      </HStack>
    </Flex>
  )
}
