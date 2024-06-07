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

type DeleteSelectedAddressDialogProps = {
  isOpen: boolean
  onClose: () => void
  cancelRef: React.RefObject<HTMLButtonElement>
  onRemoveSelectedAddress: () => void
}

export function DeleteSelectedAddressDialog({
  isOpen,
  onClose,
  cancelRef,
  onRemoveSelectedAddress,
}: Readonly<DeleteSelectedAddressDialogProps>) {
  const toast = useToast()

  function handleDeleteAllAddresses() {
    onRemoveSelectedAddress()
    onClose()

    toast({
      title: 'O endereço selecionado foi excluído.',
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
      size="lg"
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>
          Tem certeza que deseja excluir esse endereço?
        </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <Highlight
            query={['Esse', 'marcado', 'endereço de entrega']}
            styles={{
              fontWeight: '700',
            }}
          >
            Esse endereço está marcado como o endereço de entrega.
          </Highlight>
          <br />
          <Highlight
            query={['o mais recente', 'endereço de entrega']}
            styles={{
              fontWeight: '700',
              color: 'red.600',
            }}
          >
            Caso o exclua, se tiver outros endereços cadastrados, o mais recente
            será usado como o endereço de entrega.
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
