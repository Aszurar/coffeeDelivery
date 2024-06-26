import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { ShoppingCart } from '@phosphor-icons/react'
import Lottie from 'lottie-react'

import coffeeAnimation from '@/assets/animations/coffee.json'
import { COFFEE_TYPES } from '@/dto/coffee'
import { IOrder } from '@/dto/order'
import { priceFormatter, priceFormatterWithCurrency } from '@/utils/number'

type OrderProps = Omit<IOrder, 'id'>

type OrderCardProps = {
  order: OrderProps
  number: number
}

export function OrderCard({ number, order }: OrderCardProps) {
  const totalPriceFormatted = priceFormatterWithCurrency.format(order.price)
  const orderNumber = number
  return (
    <Card maxW="md" borderColor="purple.200" borderWidth="1px">
      <CardHeader>
        <Flex gap="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Lottie
              animationData={coffeeAnimation}
              loop={true}
              style={{ width: '50px', height: '50px' }}
            />
            <Box>
              <Heading size="sm" color="gray.550">
                Total: {totalPriceFormatted}
              </Heading>
              <Text color="gray.550">Pedido concluído • Nº {orderNumber}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>

      <Divider borderColor="purple.300" />

      <CardBody>
        <UnorderedList styleType="" flexDir="column">
          <ListItem display="flex" flexDir="column">
            {order.cart?.map((coffee) => {
              const coffeeData = COFFEE_TYPES.find(
                (type) => type.id === coffee.id,
              )
              const coffeePrice = coffeeData?.price ?? 0
              const coffeePriceFormatted = priceFormatter.format(coffeePrice)
              const totalCoffeePrice = coffee.quantity * coffeePrice
              const totalCoffeePriceFormatted =
                priceFormatterWithCurrency.format(totalCoffeePrice)
              return (
                <Flex key={crypto.randomUUID()} alignItems="center" gap="2">
                  <Badge
                    px="2"
                    py="0.5"
                    rounded="full"
                    fontWeight="700"
                    alignItems="center"
                    colorScheme="purple"
                    justifyContent="center"
                  >
                    {coffee.quantity}
                  </Badge>
                  <Flex flexDir="column">
                    <Text fontSize="sm">{coffeeData?.name}</Text>
                    <Flex gap="1" fontFamily="heading">
                      <Text>
                        {coffee.quantity}x{coffeePriceFormatted} =
                      </Text>
                      <Text color="purple.700">
                        {totalCoffeePriceFormatted}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              )
            })}
          </ListItem>

          <Flex gap="1" fontFamily="heading">
            <Text>+ Frete: </Text>
            <Text color="purple.700">R$ 10,00</Text>
          </Flex>
        </UnorderedList>
      </CardBody>

      <Divider borderColor="purple.300" />

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <Box>
          <Text color="gray.550">
            {order.address.street}, {order.address.number},{' '}
            {order.address.neighborhood}, {order.address.cep},{' '}
            {order.address.city}, {order.address.uf}.
          </Text>
        </Box>
        <Button
          flex="1"
          variant="ghost"
          colorScheme="purple"
          leftIcon={<ShoppingCart weight="fill" />}
          fontFamily="heading"
        >
          Adicionar ao carrinho
        </Button>
      </CardFooter>
    </Card>
  )
}
