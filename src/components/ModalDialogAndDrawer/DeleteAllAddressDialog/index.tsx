import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from '@chakra-ui/react'

import { useStore } from '@/store'

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
}: DeleteAllAddressDialogProps) {
  const deleteAllAddresses = useStore((state) => state.deleteAllAddress)

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
          Tem certeza que deseja excluir todos os endereços?
        </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Ao excluir todos os endereços, você não poderá desfazer essa ação.
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
