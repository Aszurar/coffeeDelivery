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

import { useCartSelectors } from '@/store'

type DeleteAllItemsOnCartDialogProps = {
  isOpen: boolean
  onClose: () => void
  cancelRef: React.RefObject<HTMLButtonElement>
  onCloseCarDrawer: () => void
}

export function DeleteAllItemsOnCartDialog({
  isOpen,
  onClose,
  cancelRef,
  onCloseCarDrawer,
}: Readonly<DeleteAllItemsOnCartDialogProps>) {
  const { removeAllItemsFromCart } = useCartSelectors()

  const toast = useToast()

  function handleDeleteAllAddresses() {
    removeAllItemsFromCart()
    onClose()

    setTimeout(() => {
      onCloseCarDrawer()
    }, 750)

    toast({
      title: 'Todos os itens foram excluídos do carrinho.',
      status: 'info',
      duration: 5000,
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
            query={['excluir todos os itens']}
            styles={{
              fontWeight: '700',
              color: 'red.600',
              _dark: {
                color: 'red.400',
              },
            }}
          >
            Tem certeza que deseja excluir todos os itens do carrinho?
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
            Ao excluir todos os itens do carrinho, você não poderá desfazer essa
            ação.
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
