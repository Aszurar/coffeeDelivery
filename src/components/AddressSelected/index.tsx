import { Card, CardBody, Flex, Text } from '@chakra-ui/react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { MapPinArea } from '@phosphor-icons/react'

import { useStore } from '@/store'
import { formatCEP } from '@/utils/string'

import { AddressesEmptyCard } from './AddressEmptyCard'
import { BottomButtons } from './BottomButtons'

type AddressSelectedProps = {
  onEditAddress: () => void
  isEditable: boolean
  onCancelEditAddress: () => void
  onSelectAddressModalOpen: () => void
  onDeleteSelectedAddressDialogOpen: () => void
}

export function AddressSelected({
  onEditAddress,
  isEditable,
  onCancelEditAddress,
  onSelectAddressModalOpen,
  onDeleteSelectedAddressDialogOpen,
}: AddressSelectedProps) {
  const [parent] = useAutoAnimate()

  const { getTheSelectedAddress, totalAddresses } = useStore((state) => {
    return {
      getTheSelectedAddress: state.getTheSelectedAddress,
      totalAddresses: state.totalAddresses,
    }
  })

  const selectedAddress = getTheSelectedAddress()
  const listOfAddressesIsEmpty = totalAddresses === 0

  if (listOfAddressesIsEmpty) {
    return (
      <AddressesEmptyCard
        icon={MapPinArea}
        title="Não há endereços cadastrados"
      />
    )
  }

  if (!selectedAddress) {
    return (
      <>
        <AddressesEmptyCard
          icon={MapPinArea}
          title="Nenhum endereço selecionado"
        />
        <Flex ref={parent} gap="4">
          <BottomButtons
            isEditable={isEditable}
            onEditAddress={onEditAddress}
            onSelectAddressModalOpen={onSelectAddressModalOpen}
            onCancelEditAddress={onCancelEditAddress}
            onDeleteSelectedAddressDialogOpen={
              onDeleteSelectedAddressDialogOpen
            }
          />
        </Flex>
      </>
    )
  }

  const cepFormatted = formatCEP(selectedAddress.cep)

  return (
    <Flex flexDir="column" gap="4">
      <Card
        flexDir="row"
        w="100%"
        variant="elevated"
        align="center"
        bg="gray.100"
        gap={{
          base: '3',
          md: '5',
        }}
        borderWidth="1px"
        borderColor="yellow.500"
      >
        <CardBody fontWeight="500">
          <Text as="h3" fontSize="md" fontFamily="body" color="gray.800">
            {selectedAddress.street}, {selectedAddress.neighborhood}
          </Text>
          <Text>
            Número: {selectedAddress.number}, {selectedAddress.complement}
          </Text>
          <Text>
            {selectedAddress.city}, {selectedAddress.uf} - {cepFormatted}
          </Text>
        </CardBody>
      </Card>

      <Flex ref={parent} gap="4">
        <BottomButtons
          selectedAddressId={selectedAddress.id}
          isEditable={isEditable}
          onEditAddress={onEditAddress}
          onSelectAddressModalOpen={onSelectAddressModalOpen}
          onCancelEditAddress={onCancelEditAddress}
          onDeleteSelectedAddressDialogOpen={onDeleteSelectedAddressDialogOpen}
        />
      </Flex>
    </Flex>
  )
}
