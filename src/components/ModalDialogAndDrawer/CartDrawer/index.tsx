import {
  Button,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { CheckFat, ShoppingCart, Trash } from '@phosphor-icons/react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { CartCard } from '@/components/CartCard'
import { COFFEE_TYPES } from '@/dto/coffee'
import { DELIVERY_PRICE } from '@/dto/delivery'
import { ROUTES } from '@/router/routes'
import { useCartSelectors } from '@/store'
import { priceFormatterWithCurrency } from '@/utils/number'

import { DeleteAllItemsOnCartDialog } from '../DeleteAllItemsOnCartDialog'

type CartDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: Readonly<CartDrawerProps>) {
  const navigate = useNavigate()
  const [parent] = useAutoAnimate()

  const deleteAllItemsOnCartDialogCancelRef = useRef<HTMLButtonElement>(null)
  const {
    isOpen: isDeleteAllItemsOnCartDialogOpen,
    onOpen: onDeleteAllItemsOnCartDialogOpen,
    onClose: onDeleteAllItemsOnCartDialogClose,
  } = useDisclosure()

  const { cart, totalPriceOfItemsOnCart: totalCoffeePrice } = useCartSelectors()

  const cartIsEmpty = cart.length === 0
  const footerOpacity = cartIsEmpty ? 0.5 : 1

  const totalPriceWithDelivery = totalCoffeePrice + DELIVERY_PRICE
  const deliveryPriceFormatted =
    priceFormatterWithCurrency.format(DELIVERY_PRICE)
  const totalCoffeePriceFormatted =
    priceFormatterWithCurrency.format(totalCoffeePrice)
  const totalPriceWithDeliveryFormatted = priceFormatterWithCurrency.format(
    totalPriceWithDelivery,
  )

  const coffeesSelected = COFFEE_TYPES.filter((coffee) =>
    cart.some((item) => item.id === coffee.id),
  )

  function handleConfirmOrder() {
    onClose()
    navigate(ROUTES.CHECKOUT)
  }

  return (
    <Drawer
      placement="right"
      onClose={onClose}
      isOpen={isOpen}
      size={{
        base: 'sm',
        md: 'sm',
      }}
      colorScheme="gray"
    >
      <DrawerOverlay />
      <DrawerContent
        _dark={{
          bg: 'gray.800',
        }}
      >
        <DrawerHeader
          borderBottomWidth="1px"
          _dark={{
            color: 'gray.100',
          }}
        >
          Cafés Selecionados
          <DrawerCloseButton color="purple.300" />
        </DrawerHeader>
        <DrawerBody display="flex" flexDir="column" gap="6">
          <Flex as="section" flexDir="column" ref={parent} gap="4">
            {coffeesSelected.map((coffee) => (
              <Flex key={coffee.id} flexDir="column" gap="4">
                <CartCard coffee={coffee} />
                <Divider
                  h="1px"
                  bg="purple.400"
                  _dark={{
                    bg: 'purple.800',
                  }}
                />
              </Flex>
            ))}
            {cartIsEmpty && (
              <Center
                color="gray.550"
                flexDir="column"
                _dark={{
                  color: 'gray.500',
                }}
              >
                <Icon as={ShoppingCart} w="16" h="16" color="purple.300" />
                <Text fontSize="lg" fontWeight="700">
                  Seu carrinho está vazio.
                </Text>
              </Center>
            )}
          </Flex>

          <Flex flexDir="column" gap="3" opacity={footerOpacity}>
            <Flex
              justifyContent="space-between"
              _dark={{
                color: 'gray.100',
              }}
            >
              <Text fontSize="sm">Total de itens</Text>
              <Text>{totalCoffeePriceFormatted}</Text>
            </Flex>
            <Flex
              justifyContent="space-between"
              _dark={{
                color: 'gray.100',
              }}
            >
              <Text fontSize="sm">Entrega</Text>
              <Text>{deliveryPriceFormatted}</Text>
            </Flex>
            <Flex
              justifyContent="space-between"
              color="gray.800"
              fontWeight="700"
              fontSize="xl"
              _dark={{
                color: 'gray.200',
              }}
            >
              <Text>Total</Text>
              <Text>{totalPriceWithDeliveryFormatted}</Text>
            </Flex>
          </Flex>
          <DrawerFooter py="0" gap="3" flexDir="column">
            <Button
              h="2.875rem"
              w="100%"
              bg="purple.500"
              _hover={{
                bg: 'purple.700',
                _disabled: {
                  bg: 'purple.500',
                },
              }}
              _active={{
                bg: 'purple.500',
              }}
              color="white"
              fontSize="sm"
              fontWeight="700"
              textTransform="uppercase"
              isDisabled={cartIsEmpty}
              onClick={handleConfirmOrder}
              leftIcon={<CheckFat width={20} height={20} weight="fill" />}
            >
              Confirmar Pedido
            </Button>

            <Button
              h="2.875rem"
              w="100%"
              color="white"
              colorScheme="red"
              _dark={{
                bg: 'red.500',
                _hover: {
                  bg: 'red.600',
                },
              }}
              fontSize="sm"
              fontWeight="700"
              textTransform="uppercase"
              isDisabled={cartIsEmpty}
              onClick={onDeleteAllItemsOnCartDialogOpen}
              leftIcon={<Trash width={20} height={20} weight="fill" />}
            >
              Limpar Carrinho
            </Button>
          </DrawerFooter>
        </DrawerBody>
      </DrawerContent>

      <DeleteAllItemsOnCartDialog
        cancelRef={deleteAllItemsOnCartDialogCancelRef}
        isOpen={isDeleteAllItemsOnCartDialogOpen}
        onClose={onDeleteAllItemsOnCartDialogClose}
        onCloseCarDrawer={onClose}
      />
    </Drawer>
  )
}
