import {
  Button,
  Flex,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { AddressBook, WarningCircle } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'

import { AddressCard } from '@/components/AddressSelected/AddressCard'
import { AddressesEmptyCard } from '@/components/AddressSelected/AddressEmptyCard'
import { useAddressSelectors } from '@/store'

import { DeleteAllAddressDialog } from '../DeleteAllAddressDialog'

type SelectAddressModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function SelectAddressModal({
  isOpen,
  onClose,
}: Readonly<SelectAddressModalProps>) {
  const toast = useToast()
  const [parent] = useAutoAnimate()

  const deleteAllAddressDialogCancelRef = useRef<HTMLButtonElement>(null)
  const {
    isOpen: isDeleteAllAddressDialogOpen,
    onOpen: onDeleteAllAddressDialogOpen,
    onClose: onDeleteAllAddressDialogClose,
  } = useDisclosure()

  const {
    addresses,
    maxAddresses,
    selectAddress,
    totalAddresses,
    selectedAddress,
  } = useAddressSelectors()

  const [addressSelectedId, setAddressSelectedId] = useState('')

  const listOfAddressesIsEmpty = totalAddresses === 0

  const isDisabled =
    !addressSelectedId ||
    totalAddresses <= 1 ||
    addressSelectedId === selectedAddress?.id

  function handleChangeAddress(id: string) {
    setAddressSelectedId(id)
  }

  function handleOnClose() {
    if (selectedAddress) {
      setAddressSelectedId(selectedAddress?.id)
    }
    onClose()
  }

  function handleSubmitChangeAddress() {
    if (addressSelectedId) {
      selectAddress(addressSelectedId)

      toast({
        title: 'Endereço selecionado!',
        description: 'Seu endereço foi atualizado com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
    onClose()
  }

  useEffect(() => {
    if (selectedAddress) {
      setAddressSelectedId(selectedAddress.id)
    }
  }, [addresses, selectedAddress])

  return (
    <Modal
      onClose={handleOnClose}
      size="xl"
      isOpen={isOpen}
      scrollBehavior="inside"
    >
      <ModalOverlay backdropFilter="blur(10px) hue-rotate(15deg)" />
      <ModalContent maxH="46rem">
        <ModalHeader display="flex" justifyContent="space-between">
          <Heading fontSize="x-large"> Selecione um endereço</Heading>
          <Flex fontSize="lg" mr="8">
            <Text>{totalAddresses}/</Text>
            <Text color="purple.500">{maxAddresses}</Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody ref={parent} display="flex" flexDir="column" gap="3">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              isChecked={addressSelectedId === address.id}
              onCheck={() => handleChangeAddress(address.id)}
            />
          ))}
          {listOfAddressesIsEmpty && (
            <AddressesEmptyCard
              icon={AddressBook}
              title="Não há endereços cadastrados"
            />
          )}
        </ModalBody>
        <ModalFooter gap="4">
          <Button
            leftIcon={<Icon as={WarningCircle} w="5" h="5" />}
            colorScheme="red"
            isDisabled={listOfAddressesIsEmpty}
            onClick={onDeleteAllAddressDialogOpen}
          >
            Excluir todos os endereços
          </Button>
          <Button onClick={handleOnClose}>Cancelar</Button>
          <Button
            colorScheme="yellow"
            isDisabled={isDisabled}
            onClick={handleSubmitChangeAddress}
          >
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
      <DeleteAllAddressDialog
        cancelRef={deleteAllAddressDialogCancelRef}
        isOpen={isDeleteAllAddressDialogOpen}
        onClose={onDeleteAllAddressDialogClose}
        onCloseSelectAddressModal={onClose}
      />
    </Modal>
  )
}
