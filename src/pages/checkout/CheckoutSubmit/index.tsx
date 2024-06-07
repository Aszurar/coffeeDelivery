import {
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { ShoppingCart, Trash } from '@phosphor-icons/react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

import { CartCard } from '@/components/CartCard'
import { DeleteAllItemsOnCartDialog } from '@/components/ModalDialogAndDrawer/DeleteAllItemsOnCartDialog'
import { COFFEE_TYPES } from '@/dto/coffee'
import { DELIVERY_PRICE } from '@/dto/delivery'
import { ROUTES } from '@/router/routes'
import { useCartSelectors } from '@/store'
import { priceFormatterWithCurrency } from '@/utils/number'

export function CheckoutSubmit() {
  const deleteAllItemsOnCartDialogCancelRef = useRef<HTMLButtonElement>(null)
  const {
    isOpen: isDeleteAllItemsOnCartDialogOpen,
    onOpen: onDeleteAllItemsOnCartDialogOpen,
    onClose: onDeleteAllItemsOnCartDialogClose,
  } = useDisclosure()

  const { cart, totalPriceOfItemsOnCart: totalCoffeePrice } = useCartSelectors()

  const cartIsEmpty = cart.length === 0

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

  const cartOpacity = cartIsEmpty ? 0.5 : 1

  return (
    <>
      <Heading fontSize="lg" color="gray.800">
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
      >
        <Flex as="section" flexDir="column" gap="6" opacity={cartOpacity}>
          {coffeesSelected.map((coffee) => (
            <Flex key={coffee.id} flexDir="column">
              <CartCard coffee={coffee} />
              <Divider h="1px" bg="gray.400" />
            </Flex>
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
          >
            <Text>Total</Text>
            <Text>{totalPriceWithDeliveryFormatted}</Text>
          </Flex>
        </Flex>

        <Flex flexDir="column" gap="4">
          <Link style={{ display: 'flex' }} to={ROUTES.ORDER_CONFIRMED}>
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
              color="white"
              fontSize="sm"
              fontWeight="700"
              isDisabled={cartIsEmpty}
              textTransform="uppercase"
            >
              Fechar Pedido
            </Button>
          </Link>

          <Button
            h="2.875rem"
            w="100%"
            colorScheme="red"
            fontSize="sm"
            fontWeight="700"
            textTransform="uppercase"
            isDisabled={cartIsEmpty}
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
