import { Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useEffect, useState } from 'react'

import { OrderCard } from '@/components/OrderCard'
import { IOrder } from '@/dto/order'
import { getOrders } from '@/storage/orders/get-orders'

export function OrderHistoric() {
  const [orders, setOrders] = useState<IOrder[]>()
  const [parent] = useAutoAnimate()

  function getOrderHistoric() {
    const response = getOrders()
    setOrders(response)
  }

  useEffect(() => {
    getOrderHistoric()
  }, [])

  return (
    <Flex flexDir="column" gap="5">
      <Heading>Meus Pedidos</Heading>
      <Text fontWeight="600">Histórico</Text>

      <Grid
        ref={parent}
        gap="8"
        w="100%"
        templateColumns={{
          base: 'repeat(1, 1fr)',
          lg: 'repeat(2, 1fr)',
          xl: 'repeat(3, 1fr)',
        }}
      >
        {orders?.map((order, index) => (
          <GridItem key={order.id}>
            <OrderCard number={index + 1} order={order} />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  )
}
