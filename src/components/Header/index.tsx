import {
  Button,
  Flex,
  HStack,
  IconButton,
  Tooltip,
  useColorMode,
  useToast,
} from '@chakra-ui/react'
import { MoonStars, Receipt, Sun } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import LogoDarkSVG from '@/assets/icons/logo-dark.svg'
import LogoLightSVG from '@/assets/icons/logo-light.svg'
import { ROUTES } from '@/router/routes'
import { getAddresses } from '@/services/api/get-addresses'
import { getSelectedAddresses } from '@/services/api/get-selected-address'
import { useAddressSelectors } from '@/store'

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
  const toast = useToast()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { loadSelectedAddress } = useAddressSelectors()
  const { colorMode, toggleColorMode } = useColorMode()
  const { loadAddresses, setAddressLoading } = useAddressSelectors()

  const themeMode = THEME_MODE[colorMode]

  const {
    data: addresses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['addresses'],
    queryFn: getAddresses,
  })

  if (isError) {
    toast({
      title: 'Erro ao carregar os endereços',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  const {
    data: selectedAddressesPersisted,
    isLoading: isSelectAddressPersistedLoading,
    isError: isSelectAddressPersistedError,
  } = useQuery({
    queryKey: ['selected-address'],
    queryFn: getSelectedAddresses,
  })

  if (isSelectAddressPersistedError) {
    toast({
      title: 'Erro ao carregar endereço selecionado',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  const isAddressLoading = isLoading || isSelectAddressPersistedLoading

  useEffect(() => {
    setAddressLoading(isLoading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  useEffect(() => {
    if (addresses) {
      loadAddresses(addresses)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses])

  useEffect(() => {
    if (selectedAddressesPersisted) {
      return loadSelectedAddress(selectedAddressesPersisted)
    }
    loadSelectedAddress()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAddressesPersisted])

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
        <AddressButton isAddressLoading={isAddressLoading} />
        <CartButton />
      </HStack>
    </Flex>
  )
}
