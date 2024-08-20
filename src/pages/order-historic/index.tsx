import { Flex, Grid, GridItem, Heading, Text, useToast } from '@chakra-ui/react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useEffect, useState } from 'react'

import { OrderCardMemo } from '@/components/OrderCard'
import { IOrder } from '@/dto/order'
import { getOrders } from '@/storage/orders/get-orders'
import { useCartSelectors } from '@/store'
import { CartProps } from '@/store/cart'

export function OrderHistoric() {
  const [orders, setOrders] = useState<IOrder[]>()
  const [parent] = useAutoAnimate()
  const { addItemToCart } = useCartSelectors()
  const toast = useToast()

  function getOrderHistoric() {
    const response = getOrders()
    setOrders(response)
  }

  function handleAddOldOrderToCart(oldOrderCart: CartProps[]) {
    if (oldOrderCart) {
      oldOrderCart.forEach((coffee) => {
        addItemToCart(coffee)
      })

      toast({
        title: 'Pedido adicionado ao carrinho',
        status: 'success',
        isClosable: true,
        containerStyle: {
          mt: '6rem',
        },
      })

      return
    }

    toast({
      title: 'Erro ao adicionar pedido ao carrinho',
      status: 'error',
      isClosable: true,
    })
  }

  useEffect(() => {
    getOrderHistoric()
  }, [])

  return (
    <Flex flexDir="column" gap="5" as="main">
      <Heading as="h1">Meus Pedidos</Heading>
      <Text fontWeight="600">Histórico</Text>

      <Grid
        w="100%"
        ref={parent}
        gap={{
          base: '4',
          lg: '6',
        }}
        justifyItems="center"
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          '2xl': 'repeat(3, 1fr)',
        }}
      >
        {orders?.map((order, index) => (
          <GridItem key={order.id} w="fit-content">
            <OrderCardMemo
              number={index + 1}
              order={order}
              onAddOldOrderToCart={() => handleAddOldOrderToCart(order.cart)}
            />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  )
}
