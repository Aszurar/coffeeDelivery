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
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { CaretDown, CaretUp, ShoppingCart } from '@phosphor-icons/react'
import Lottie from 'lottie-react'
import { useState } from 'react'

import coffeeAnimation from '@/assets/animations/coffee.json'
import { IOrder } from '@/dto/order'
import { PAYMENT_TYPE_VALUES } from '@/dto/payment'
import { priceFormatter, priceFormatterWithCurrency } from '@/utils/number'

type OrderProps = Omit<IOrder, 'id'>

type OrderCardProps = {
  order: OrderProps
  number: number
}

export function OrderCard({ number, order }: Readonly<OrderCardProps>) {
  const totalPriceFormatted = priceFormatterWithCurrency.format(order.price)
  const orderNumber = number
  const hasMoreThanOneItem = order.cart?.length > 1
  const [isShowAllItens, setIsShowAllItens] = useState(false)
  const [parent] = useAutoAnimate()

  const showItensButtonInfo = isShowAllItens
    ? { label: 'Ver menos itens', icon: <CaretUp weight="bold" /> }
    : {
        label: `...Ver todos itens(+ ${order.cart?.length})`,
        icon: <CaretDown weight="bold" />,
      }

  const paymentTypeSelected = PAYMENT_TYPE_VALUES[order.paymentType]

  function handleToggleShowAllItens() {
    setIsShowAllItens((prevState) => !prevState)
  }

  return (
    <Card
      w={{
        base: 'xs',
        lg: 'sm',
      }}
      borderColor="purple.200"
      borderWidth="1px"
      _dark={{
        borderColor: 'purple.900',
      }}
    >
      <CardHeader>
        <Flex gap="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Lottie
              animationData={coffeeAnimation}
              loop={true}
              style={{ width: '50px', height: '50px' }}
            />
            <Box color="gray.550" _dark={{ color: 'gray.100' }}>
              <Heading size="sm">Total: {totalPriceFormatted}</Heading>
              <Text fontSize="sm" fontWeight="700">
                {paymentTypeSelected}
              </Text>
              <Text>Pedido concluído • Nº {orderNumber}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>

      <Divider
        borderColor="purple.300"
        _dark={{
          borderColor: 'purple.600',
        }}
      />

      <CardBody>
        <UnorderedList ref={parent} styleType="" flexDir="column">
          {order.cart?.map((coffee, index) => {
            const coffeePrice = coffee.price ?? 0
            const coffeePriceFormatted = priceFormatter.format(coffeePrice)
            const totalCoffeePrice = coffee.quantity * coffeePrice
            const totalCoffeePriceFormatted =
              priceFormatterWithCurrency.format(totalCoffeePrice)
            const itemsAfterFirst = index > 0

            if (itemsAfterFirst && !isShowAllItens) {
              return null
            }

            return (
              <ListItem
                key={crypto.randomUUID()}
                display="flex"
                alignItems="center"
                gap="2"
              >
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
                  <Text fontSize="sm">{coffee.name}</Text>
                  <Flex gap="1" fontFamily="heading">
                    <Text>
                      {coffee.quantity}x{coffeePriceFormatted} =
                    </Text>
                    <Text
                      color="purple.700"
                      _dark={{
                        color: 'purple.200',
                      }}
                    >
                      {totalCoffeePriceFormatted}
                    </Text>
                  </Flex>
                </Flex>
              </ListItem>
            )
          })}
          {hasMoreThanOneItem && (
            <Flex flexDir="column">
              <Button
                variant="ghost"
                color="purple.500"
                w="fit-content"
                h="fit-content"
                py="1"
                px="2"
                _active={{
                  color: 'purple.700',
                }}
                _dark={{
                  color: 'purple.300',
                  _active: {
                    color: 'purple.400',
                  },
                }}
                onClick={handleToggleShowAllItens}
                rightIcon={showItensButtonInfo.icon}
              >
                {showItensButtonInfo.label}
              </Button>
            </Flex>
          )}

          <Flex gap="1" fontFamily="heading">
            <Text>+ Frete: </Text>
            <Text
              color="purple.700"
              _dark={{
                color: 'purple.200',
              }}
            >
              R$ 10,00
            </Text>
          </Flex>
        </UnorderedList>
      </CardBody>

      <Divider
        borderColor="purple.300"
        _dark={{
          borderColor: 'purple.600',
        }}
      />

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
          <Text color="gray.550" _dark={{ color: 'gray.400' }}>
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
