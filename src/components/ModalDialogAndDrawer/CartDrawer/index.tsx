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
} from '@chakra-ui/react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { CheckFat, ShoppingCart, Trash } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'

import { CartCard } from '@/components/CartCard'
import { COFFEE_TYPES } from '@/dto/coffee'
import { DELIVERY_PRICE } from '@/dto/delivery'
import { ROUTES } from '@/router/routes'
import { useStore } from '@/store'
import { priceFormatterWithCurrency } from '@/utils/number'

type CartDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const navigate = useNavigate()
  const [parent] = useAutoAnimate()
  const { cart, totalCoffeePrice, handleRemoveAllItemsFromCart } = useStore(
    (state) => {
      return {
        cart: state.cart,
        totalCoffeePrice: state.totalPriceOfItemsOnCart,
        handleRemoveAllItemsFromCart: state.removeAllItemsFromCart,
      }
    },
  )

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

  function handleClearCart() {
    handleRemoveAllItemsFromCart()

    setTimeout(() => {
      onClose()
    }, 750)
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
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          Cafés Selecionados
          <DrawerCloseButton color="purple.500" />
        </DrawerHeader>
        <DrawerBody display="flex" flexDir="column" gap="6">
          <Flex as="section" flexDir="column" gap="6" ref={parent}>
            {coffeesSelected.map((coffee) => (
              <>
                <CartCard key={coffee.id} coffee={coffee} />
                <Divider h="1px" bg="purple.500" />
              </>
            ))}
            {cartIsEmpty && (
              <Center color="gray.550" flexDir="column">
                <Icon as={ShoppingCart} w="16" h="16" color="purple.300" />
                <Text fontSize="lg" fontWeight="700">
                  Seu carrinho está vazio.
                </Text>
              </Center>
            )}
          </Flex>

          <Flex flexDir="column" gap="3" opacity={footerOpacity}>
            <Flex justifyContent="space-between">
              <Text fontSize="sm">Total de itens</Text>
              <Text>{totalCoffeePriceFormatted}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text fontSize="sm">Entrega</Text>
              <Text>{deliveryPriceFormatted}</Text>
            </Flex>
            <Flex
              justifyContent="space-between"
              color="gray.800"
              fontWeight="700"
              fontSize="xl"
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
              colorScheme="red"
              fontSize="sm"
              fontWeight="700"
              textTransform="uppercase"
              isDisabled={cartIsEmpty}
              onClick={handleClearCart}
              leftIcon={<Trash width={20} height={20} weight="fill" />}
            >
              Limpar Carrinho
            </Button>
          </DrawerFooter>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
