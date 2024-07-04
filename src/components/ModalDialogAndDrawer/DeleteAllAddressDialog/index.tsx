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

import { useAddressSelectors } from '@/store'

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
  const { deleteAllAddresses } = useAddressSelectors()

  const toast = useToast()

  function handleDeleteAllAddresses() {
    deleteAllAddresses()
    onClose()
    onCloseSelectAddressModal()

    toast({
      title: 'Todos os endereços foram excluídos.',
      status: 'info',
      duration: 3000,
    })
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
          <Button ref={cancelRef} onClick={onClose}>
            Não
          </Button>
          <Button colorScheme="red" ml={3} onClick={handleDeleteAllAddresses}>
            Sim
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
