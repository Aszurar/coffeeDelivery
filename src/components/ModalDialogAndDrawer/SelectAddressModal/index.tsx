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
import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'

import { AddressCard } from '@/components/AddressSelected/AddressCard'
import { AddressesEmptyCard } from '@/components/AddressSelected/AddressEmptyCard'
import { SelectAddressModalLoading } from '@/components/Skeleton/SelectAddressModalLoading/inde'
import { updateSelectedAddress } from '@/services/api/update-selected-address'
import { queryClient } from '@/services/react-query'
import { useAddressSelectors } from '@/store'

import { DeleteAllAddressDialog } from '../DeleteAllAddressDialog'

type SelectAddressModalProps = {
  isOpen: boolean
  onClose: () => void
  isAddressLoading: boolean
}

export function SelectAddressModal({
  isOpen,
  onClose,
  isAddressLoading,
}: Readonly<SelectAddressModalProps>) {
  const toast = useToast()
  const [parent] = useAutoAnimate()

  const deleteAllAddressDialogCancelRef = useRef<HTMLButtonElement>(null)
  const {
    isOpen: isDeleteAllAddressDialogOpen,
    onOpen: onDeleteAllAddressDialogOpen,
    onClose: onDeleteAllAddressDialogClose,
  } = useDisclosure()

  const { addresses, maxAddresses, totalAddresses, selectedAddress } =
    useAddressSelectors()

  const [addressSelectedId, setAddressSelectedId] = useState('')

  const listOfAddressesIsEmpty = totalAddresses === 0

  const {
    mutateAsync: updateSelectedAddressFn,
    isPending: isPendingSelectedAddress,
  } = useMutation({
    mutationFn: updateSelectedAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['selected-address'] })
    },
  })

  async function onUpdateSelectedAddress(addressId?: string) {
    try {
      const findSelectedAddress = addresses.find(
        (address) => address.id === addressId,
      )

      if (!findSelectedAddress) {
        return
      }

      await updateSelectedAddressFn({ address: findSelectedAddress })
    } catch (error) {
      toast({
        title: 'Erro ao salvar endereço selecionado',
        description: 'Tente novamente mais tarde.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

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

  async function handleSubmitChangeAddress() {
    if (addressSelectedId) {
      await onUpdateSelectedAddress(addressSelectedId)

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
      <ModalContent
        maxH="46rem"
        top={{
          base: '0',
          sm: '20',
        }}
        mt={{
          base: 'auto',
          sm: '0',
        }}
        mb={{
          base: '4',
          sm: 'auto',
        }}
      >
        <ModalHeader
          display="flex"
          justifyContent="space-between"
          _dark={{
            color: 'white',
          }}
        >
          <Heading fontSize="x-large"> Selecione um endereço</Heading>
          <Flex fontSize="lg" mr="8">
            <Text>{totalAddresses}/</Text>
            <Text
              color="purple.500"
              _dark={{
                color: 'purple.400',
              }}
            >
              {maxAddresses}
            </Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody ref={parent} display="flex" flexDir="column" gap="3">
          {isAddressLoading && <SelectAddressModalLoading />}
          {!isAddressLoading &&
            addresses.map((address) => (
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
        <ModalFooter
          gap="4"
          flexDirection={{
            base: 'column',
            sm: 'row-reverse',
          }}
        >
          <Flex gap="4">
            <Button
              onClick={handleOnClose}
              isLoading={isPendingSelectedAddress}
            >
              Cancelar
            </Button>
            <Button
              colorScheme="yellow"
              isDisabled={isDisabled}
              isLoading={isPendingSelectedAddress}
              onClick={handleSubmitChangeAddress}
            >
              Confirmar
            </Button>
          </Flex>
          <Button
            leftIcon={<Icon as={WarningCircle} w="5" h="5" />}
            colorScheme="red"
            isDisabled={listOfAddressesIsEmpty}
            onClick={onDeleteAllAddressDialogOpen}
            isLoading={isPendingSelectedAddress}
          >
            Excluir todos os endereços
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
