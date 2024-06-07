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
        <AlertDialogHeader>
          <Highlight
            query={['excluir todos']}
            styles={{
              fontWeight: '700',
              color: 'red.600',
            }}
          >
            Tem certeza que deseja excluir todos os endereços?
          </Highlight>
        </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <Highlight
            query={['não poderá desfazer']}
            styles={{
              fontWeight: '700',
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
