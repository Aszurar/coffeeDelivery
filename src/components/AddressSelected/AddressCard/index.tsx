import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Icon,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { CheckCircle, Trash } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { useRef } from 'react'

import { DeleteSelectedAddressDialog } from '@/components/ModalDialogAndDrawer/DeleteSelectedAddressDialog'
import { SelectButton } from '@/components/SelectButton'
import { deleteAddressById } from '@/services/api/delete-address-by-id'
import { queryClient } from '@/services/react-query'
import { AddressProps } from '@/store/address'
import { formatCEP } from '@/utils/string'

type AddressCardProps = {
  address: AddressProps
  isChecked: boolean
  onCheck: () => void
}

const selectedStyle = {
  borderColor: 'yellow.500',
  shadow: 'lg',
  buttonBackgroundColor: 'white',
  cardBorderBottomColor: 'yellow.200',
}

const unSelectedStyle = {
  borderColor: 'gray.300',
  shadow: 'none',
  buttonBackgroundColor: 'gray.200',
  cardBorderBottomColor: 'gray.300',
}

export function AddressCard({ address, isChecked, onCheck }: AddressCardProps) {
  const cepFormatted = formatCEP(address.cep)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const deleteAllAddressDialogCancelRef = useRef<HTMLButtonElement>(null)
  const toast = useToast()

  const [parent] = useAutoAnimate()

  async function handleRemoveAddress(id: string) {
    if (isChecked) {
      onOpen()

      return
    }

    await onDeleteSelectedAddress(id)
  }

  const {
    mutateAsync: deleteAddressByIdFn,
    isPending: isPendingDeleteAddressById,
  } = useMutation({
    mutationFn: deleteAddressById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
    },
  })

  async function onDeleteSelectedAddress(addressId: string) {
    try {
      await deleteAddressByIdFn({ id: addressId })
    } catch (error) {
      toast({
        title: 'Erro ao remover endereço',
        description: 'Tente novamente mais tarde.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const checkStyle = isChecked ? selectedStyle : unSelectedStyle

  return (
    <Box
      w="100%"
      rounded="6px"
      borderColor={checkStyle.borderColor}
      borderWidth="2px"
      shadow={checkStyle.shadow}
      _focusWithin={{
        borderColor: 'yellow.500',
      }}
      _dark={{
        _focusWithin: {
          borderColor: 'yellow.400',
        },
      }}
    >
      <Button
        display="flex"
        w="100%"
        textAlign="start"
        variant="unstyled"
        height="fit-content"
        bg={checkStyle.buttonBackgroundColor}
        roundedBottom="0"
        isActive={isChecked}
        _hover={{
          bg: 'white',
          _disabled: {
            bg: 'white',
          },
        }}
        _active={{
          bg: 'gray.200',
        }}
        onClick={onCheck}
        _dark={{
          bg: 'gray.700',
          _hover: {
            bg: 'gray.800',
            _disabled: {
              bg: 'gray.900',
            },
          },
          _active: {
            bg: 'gray.800',
          },
        }}
      >
        <Card
          ref={parent}
          flexDir="row"
          p="4"
          variant="unstyled"
          w="100%"
          borderRadius={0}
          borderWidth="0"
          align="center"
          bg="transparent"
          gap={{
            base: '3',
            md: '5',
          }}
          borderBottom="1px"
          borderColor={checkStyle.borderColor}
        >
          <CardBody
            pr="0"
            fontSize="sm"
            fontWeight="400"
            style={{
              textWrap: 'wrap',
            }}
          >
            <Text
              color="gray.600"
              _dark={{
                color: 'gray.300',
              }}
            >
              {address.street}, {address.neighborhood}
            </Text>
            <Text>
              Número: {address.number}, {address.complement}
            </Text>
            <Text>
              {address.city}, {address.uf} - {cepFormatted}
            </Text>
          </CardBody>
          {isChecked && (
            <Icon
              as={CheckCircle}
              w="10"
              h="10"
              mr="4"
              weight="fill"
              color="yellow.500"
              _dark={{
                color: 'yellow.400',
              }}
            />
          )}
        </Card>
      </Button>
      <Flex gap="2" p="1" justifyContent="flex-end" roundedBottom="base">
        <SelectButton
          p="2"
          h="8"
          w="fit-content"
          bg="transparent"
          variant="outline"
          icon={Trash}
          isLoading={isPendingDeleteAddressById}
          onClick={async () => await handleRemoveAddress(address.id)}
        >
          Remover
        </SelectButton>
      </Flex>

      <DeleteSelectedAddressDialog
        cancelRef={deleteAllAddressDialogCancelRef}
        isOpen={isOpen}
        onClose={onClose}
        onRemoveSelectedAddress={async () =>
          await onDeleteSelectedAddress(address.id)
        }
      />
    </Box>
  )
}
