import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Highlight,
  useToast,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { deleteAllAddress } from '@/services/api/delete-all-address'
import { updateSelectedAddress } from '@/services/api/update-selected-address'
import { queryClient } from '@/services/react-query'
import { useAddressSelectors } from '@/store'
import { AddressProps } from '@/store/address'

type DeleteAllAddressDialogProps = {
  isOpen: boolean
  onClose: () => void
  cancelRef: React.RefObject<HTMLButtonElement>
  onCloseSelectAddressModal: () => void
}

export function DeleteAllAddressDialog({
  isOpen,
  onClose,
  cancelRef,
  onCloseSelectAddressModal,
}: Readonly<DeleteAllAddressDialogProps>) {
  const toast = useToast()

  const { addresses } = useAddressSelectors()

  const {
    mutateAsync: deleteAllAddressFn,
    isPending: isPendingDeleteAllAddress,
  } = useMutation({
    mutationFn: deleteAllAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['selected-address'] })
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
    },
  })

  const {
    mutateAsync: updateSelectedAddressFn,
    isPending: isPendingSelectedAddress,
  } = useMutation({
    mutationFn: updateSelectedAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['selected-address'] })
    },
  })

  const isLoading = isPendingDeleteAllAddress || isPendingSelectedAddress

  async function onDeleteSelectedAddress() {
    try {
      await deleteAllAddressFn({
        addresses,
      })

      await updateSelectedAddressFn({ address: {} as AddressProps })

      toast({
        title: 'Endereços excluídos!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Erro ao excluir os endereços',
        description: 'Tente novamente mais tarde.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  async function handleDeleteAllAddresses() {
    await onDeleteSelectedAddress()
    onClose()
    onCloseSelectAddressModal()
  }

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader
          _dark={{
            color: 'gray.100',
          }}
        >
          <Highlight
            query={['excluir todos']}
            styles={{
              fontWeight: '700',
              color: 'red.600',
              _dark: {
                color: 'red.400',
              },
            }}
          >
            Tem certeza que deseja excluir todos os endereços?
          </Highlight>
        </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody
          _dark={{
            color: 'gray.300',
          }}
        >
          <Highlight
            query={['não poderá desfazer']}
            styles={{
              fontWeight: '700',
              _dark: {
                color: 'white',
              },
            }}
          >
            Ao excluir todos os endereços, você não poderá desfazer essa ação.
          </Highlight>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose} isLoading={isLoading}>
            Não
          </Button>
          <Button
            colorScheme="red"
            ml={3}
            isLoading={isLoading}
            onClick={handleDeleteAllAddresses}
          >
            Sim
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
