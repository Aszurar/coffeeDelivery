import { Button, Flex, HStack, useToken } from '@chakra-ui/react'
import { MapPin } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

import Logo from '@/assets/icons/logo.svg'
import { useAddressSelectors } from '@/store'

import { CartButton } from './CartButton'

export function Header() {
  const [purple500, gray600] = useToken('colors', ['purple.500', 'gray.600'])

  const { selectedAddress } = useAddressSelectors()

  const localizationEmpty = {
    bg: 'gray.300',
    color: 'gray.600',
    hover: {
      bg: 'gray.400',
    },
    active: {
      bg: 'gray.500',
    },
    iconColor: gray600,
    label: 'Selecione sua localização',
  }

  const localizationFilled = {
    bg: 'purple.200',
    color: 'purple.700',
    hover: {
      bg: 'purple.100',
    },
    active: {
      bg: 'purple.200',
    },
    iconColor: purple500,
    label: `${selectedAddress?.city}, ${selectedAddress?.uf}`,
  }

  const localizationButtonLabel = selectedAddress
    ? localizationFilled
    : localizationEmpty

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
          bg={localizationButtonLabel.bg}
          color={localizationButtonLabel.color}
          leftIcon={
            <MapPin
              weight="fill"
              color={localizationButtonLabel.iconColor}
              width={22}
              height={22}
            />
          }
          _hover={{
            bg: localizationButtonLabel.hover.bg,
          }}
          _active={{
            bg: localizationButtonLabel.active.bg,
          }}
        >
          {localizationButtonLabel.label}
        </Button>

        <CartButton />
      </HStack>
    </Flex>
  )
}
