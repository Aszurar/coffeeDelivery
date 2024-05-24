import { Badge, Box, Button, Icon } from '@chakra-ui/react'
import { AddressBook, PencilSimpleLine, Trash } from '@phosphor-icons/react'

import { SelectButton } from '@/components/SelectButton'
import { useStore } from '@/store'

type BottomButtonsProps = {
  isEditable: boolean
  selectedAddressId?: string
  onEditAddress: () => void
  onCancelEditAddress: () => void
  onSelectAddressModalOpen: () => void
  onDeleteSelectedAddressDialogOpen: () => void
}

export function BottomButtons({
  isEditable,
  onEditAddress,
  selectedAddressId,
  onCancelEditAddress,
  onSelectAddressModalOpen,
  onDeleteSelectedAddressDialogOpen,
}: BottomButtonsProps) {
  const totalAddresses = useStore((state) => state.totalAddresses)
  const hasOnlyOneAddress = totalAddresses === 1
  const badgeDisabledStyle = hasOnlyOneAddress ? '0.5' : '1'

  if (!selectedAddressId) {
    return (
      <Button
        type="button"
        h="9"
        fontSize="sm"
        fontWeight="700"
        textTransform="uppercase"
        color="white"
        bg="yellow.500"
        _hover={{
          bg: 'yellow.700',
          _disabled: {
            bg: 'yellow.500',
          },
        }}
        _active={{
          bg: 'yellow.500',
        }}
        isDisabled={hasOnlyOneAddress}
        onClick={onSelectAddressModalOpen}
        leftIcon={<Icon as={AddressBook} w="5" h="5" />}
      >
        Selecionar outro endereço
      </Button>
    )
  }

  if (isEditable) {
    return (
      <Button
        type="button"
        variant="ghost"
        colorScheme="yellow"
        fontSize="sm"
        fontWeight="700"
        textTransform="uppercase"
        _hover={{
          bg: 'yellow.200',
        }}
        _active={{
          bg: 'yellow.300',
        }}
        onClick={onCancelEditAddress}
      >
        Cancelar Edição
      </Button>
    )
  }

  return (
    <>
      <Box position="relative">
        <Button
          type="button"
          h="9"
          fontSize="sm"
          fontWeight="700"
          textTransform="uppercase"
          color="white"
          bg="yellow.500"
          _hover={{
            bg: 'yellow.700',
            _disabled: {
              bg: 'yellow.500',
            },
          }}
          _active={{
            bg: 'yellow.500',
          }}
          isDisabled={hasOnlyOneAddress}
          onClick={onSelectAddressModalOpen}
          leftIcon={<Icon as={AddressBook} w="5" h="5" />}
        >
          Selecionar outro endereço
        </Button>

        {!!totalAddresses && (
          <Badge
            variant="solid"
            h="5"
            w="5"
            opacity={badgeDisabledStyle}
            display="flex"
            justifyContent="center"
            alignItems="center"
            rounded="full"
            colorScheme="purple"
            position="absolute"
            top="-2"
            right="-2"
            shadow="md"
          >
            {totalAddresses}
          </Badge>
        )}
      </Box>

      <Button
        type="button"
        fontWeight="700"
        h="9"
        fontSize="sm"
        variant="outline"
        textTransform="uppercase"
        colorScheme="yellow"
        bg="transparent"
        _hover={{
          bg: 'gray.400',
          _disabled: {
            bg: 'transparent',
          },
        }}
        _active={{
          bg: 'transparent',
        }}
        onClick={onEditAddress}
        leftIcon={<Icon as={PencilSimpleLine} w="5" h="5" />}
      >
        Editar
      </Button>
      <SelectButton
        h="9"
        w="fit-content"
        bg="transparent"
        variant="outline"
        icon={Trash}
        onClick={onDeleteSelectedAddressDialogOpen}
      >
        Remover
      </SelectButton>
    </>
  )
}
