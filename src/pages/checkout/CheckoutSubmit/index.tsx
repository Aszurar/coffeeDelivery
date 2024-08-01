import {
  Alert,
  AlertIcon,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ShoppingCart, Trash } from '@phosphor-icons/react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { CartCard } from '@/components/CartCard'
import { DeleteAllItemsOnCartDialog } from '@/components/ModalDialogAndDrawer/DeleteAllItemsOnCartDialog'
import { COFFEE_TYPES } from '@/dto/coffee'
import { DELIVERY_PRICE } from '@/dto/delivery'
import { IOrder } from '@/dto/order'
import { PAYMENT_TYPE } from '@/dto/payment'
import { ROUTES } from '@/router/routes'
import { saveOrder } from '@/storage/orders/save-order'
import {
  useAddressSelectors,
  useCartSelectors,
  useOrderSelectors,
  usePaymentSelectors,
} from '@/store'
import { priceFormatterWithCurrency } from '@/utils/number'

export function CheckoutSubmit() {
  const toast = useToast()
  const navigate = useNavigate()
  const [parent] = useAutoAnimate()
  const deleteAllItemsOnCartDialogCancelRef = useRef<HTMLButtonElement>(null)
  const {
    isOpen: isDeleteAllItemsOnCartDialogOpen,
    onOpen: onDeleteAllItemsOnCartDialogOpen,
    onClose: onDeleteAllItemsOnCartDialogClose,
  } = useDisclosure()

  const { paymentType } = usePaymentSelectors()
  const { updateCurrentOrder } = useOrderSelectors()
  const { selectedAddress, totalAddresses, cleanIncompleteAddress } =
    useAddressSelectors()
  const {
    cart,
    totalPriceOfItemsOnCart: totalCoffeePrice,
    removeAllItemsFromCart,
  } = useCartSelectors()

  const isAddressesEmpty = totalAddresses === 0
  const IsCartEmpty = cart.length === 0
  const isPaymentTypeEmpty = paymentType === PAYMENT_TYPE.EMPTY

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

  const cartOpacity = IsCartEmpty ? 0.5 : 1

  function handleSubmitOrder() {
    if (!selectedAddress || !selectedAddress.number) {
      toast({
        title: 'Endereço de entrega inválido',
        description: 'Preencha o endereço de entrega para finalizar o pedido.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    if (isPaymentTypeEmpty) {
      toast({
        title: 'Método de pagamento inválido',
        description: 'Selecione o método de pagamento para finalizar o pedido.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    if (IsCartEmpty) {
      toast({
        title: 'Carrinho vazio',
        description:
          'Adicione pelo menos 1 item ao carrinho para finalizar o pedido.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    const order: IOrder = {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      price: totalPriceWithDelivery,
      address: selectedAddress,
      paymentType,
      cart,
    }
    saveOrder(order)
    updateCurrentOrder(order)
    navigate(ROUTES.ORDER_CONFIRMED)
    removeAllItemsFromCart()
    cleanIncompleteAddress()
  }

  return (
    <>
      <Heading
        fontSize="lg"
        color="gray.800"
        _dark={{
          color: 'gray.200',
        }}
      >
        Cafés selecionados
      </Heading>

      <Flex
        p={{
          base: '6',
          md: '10',
        }}
        mt="4"
        gap="6"
        as="section"
        flexDir="column"
        bg="gray.200"
        rounded="md"
        _dark={{
          bg: 'gray.800',
        }}
      >
        <Flex
          ref={parent}
          as="section"
          flexDir="column"
          gap="6"
          opacity={cartOpacity}
        >
          {coffeesSelected.map((coffee) => (
            <Flex key={coffee.id} flexDir="column" gap="4">
              <CartCard coffee={coffee} />
              <Divider h="1px" bg="gray.400" />
            </Flex>
          ))}
          {IsCartEmpty && (
            <Center
              color="gray.550"
              flexDir="column"
              _dark={{
                color: 'gray.400',
              }}
            >
              <Icon as={ShoppingCart} w="16" h="16" color="purple.300" />
              <Text fontSize="lg" fontWeight="700">
                Seu carrinho está vazio.
              </Text>
            </Center>
          )}
        </Flex>

        <Flex flexDir="column" gap="3" opacity={cartOpacity}>
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
            _dark={{
              color: 'gray.200',
            }}
          >
            <Text>Total</Text>
            <Text>{totalPriceWithDeliveryFormatted}</Text>
          </Flex>
        </Flex>

        <Flex ref={parent} flexDir="column" gap="4">
          {IsCartEmpty && (
            <Alert status="warning">
              <AlertIcon />
              Adicione pelo menos 1 item ao carrinho para finalizar o pedido.
            </Alert>
          )}

          {isAddressesEmpty && (
            <Alert status="warning">
              <AlertIcon />
              Preencha o endereço de entrega para finalizar o pedido.
            </Alert>
          )}

          {isPaymentTypeEmpty && (
            <Alert status="warning">
              <AlertIcon />
              Selecione o método de pagamento para finalizar o pedido.
            </Alert>
          )}

          <Button
            h="2.875rem"
            w="100%"
            bg="yellow.500"
            _hover={{
              bg: 'yellow.700',
              _disabled: {
                bg: 'yellow.500',
              },
            }}
            _active={{
              bg: 'yellow.500',
            }}
            _dark={{
              color: 'gray.800',
              bg: 'yellow.400',
              _hover: {
                bg: 'yellow.500',
              },
            }}
            color="white"
            fontSize="sm"
            fontWeight="700"
            isDisabled={IsCartEmpty || isAddressesEmpty || isPaymentTypeEmpty}
            textTransform="uppercase"
            onClick={handleSubmitOrder}
          >
            Fechar Pedido
          </Button>

          <Button
            h="2.875rem"
            w="100%"
            colorScheme="red"
            _dark={{
              bg: 'red.500',
              _hover: {
                bg: 'red.600',
              },
            }}
            color="white"
            fontSize="sm"
            fontWeight="700"
            textTransform="uppercase"
            isDisabled={IsCartEmpty}
            onClick={onDeleteAllItemsOnCartDialogOpen}
            leftIcon={<Trash width={20} height={20} weight="fill" />}
          >
            Limpar Carrinho
          </Button>
        </Flex>
      </Flex>

      <DeleteAllItemsOnCartDialog
        cancelRef={deleteAllItemsOnCartDialogCancelRef}
        isOpen={isDeleteAllItemsOnCartDialogOpen}
        onClose={onDeleteAllItemsOnCartDialogClose}
        onCloseCarDrawer={() => {}}
      />
    </>
  )
}
