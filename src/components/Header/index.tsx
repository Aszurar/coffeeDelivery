import {
  Button,
  Flex,
  HStack,
  IconButton,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react'
import { MoonStars, Receipt, Sun } from '@phosphor-icons/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import LogoDarkSVG from '@/assets/icons/logo-dark.svg'
import LogoLightSVG from '@/assets/icons/logo-light.svg'
import { ROUTES } from '@/router/routes'

import { AddressButton } from './AddressButton'
import { CartButton } from './CartButton'

const THEME_MODE = {
  light: {
    icon: <Sun width={22} height={22} weight="fill" />,
    label: 'Modo claro',
    logo: LogoLightSVG,
  },
  dark: {
    icon: <MoonStars width={22} height={22} weight="fill" />,
    label: 'Modo escuro',
    logo: LogoDarkSVG,
  },
}
export function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { colorMode, toggleColorMode } = useColorMode()

  const themeMode = THEME_MODE[colorMode]

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
        <img src={themeMode.logo} alt="Coffee Delivery" />
      </Link>

      <HStack spacing="3">
        <Tooltip hasArrow label={themeMode.label} fontFamily="heading">
          <IconButton
            variant="outline"
            w="2.375rem"
            h="2.375rem"
            minW="2.375rem"
            rounded="md"
            borderColor="gray.500"
            colorScheme="gray"
            aria-label={` Trocar ${themeMode.label}`}
            icon={themeMode.icon}
            onClick={toggleColorMode}
            _hover={{
              bg: 'gray.200',
            }}
            _active={{
              bg: 'gray.400',
            }}
            _dark={{
              borderColor: 'gray.600',
              _hover: {
                bg: 'gray.800',
              },
              _active: {
                bg: 'gray.700',
              },
            }}
          />
        </Tooltip>

        <Button
          variant="ghost"
          p="2"
          h="fit-content"
          rounded="md"
          fontWeight={400}
          fontSize={{
            base: '0',
            sm: 'sm',
            lg: 'sm',
            xl: 'sm',
          }}
          iconSpacing={{
            base: '0',
            sm: '2',
            lg: '2',
            xl: '2',
          }}
          colorScheme="purple"
          isActive={pathname === ROUTES.ORDER_HISTORIC}
          onClick={() => navigate(ROUTES.ORDER_HISTORIC)}
          leftIcon={<Receipt weight="fill" width={22} height={22} />}
          alignItems="center"
          justifyContent="center"
          _hover={{
            bg: 'purple.100',
          }}
          _active={{
            fontWeight: 700,
            bg: 'purple.200',
          }}
          _dark={{
            _hover: {
              bg: 'purple.900',
            },
            _active: {
              fontWeight: 700,
              bg: 'purple.800',
            },
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
