import { Flex, Grid, GridItem, Heading, Text, useToast } from '@chakra-ui/react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

import { OrderCard } from '@/components/OrderCard'
import { OrdersLoading } from '@/components/Skeleton/OrdersLoading'
import { getOrders } from '@/services/api/get-orders'

export function OrderHistoric() {
  const [parent] = useAutoAnimate()
  const toast = useToast()

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  })

  if (isError) {
    toast({
      title: 'Erro ao carregar  pedidos ',
      description:
        'Ocorreu um erro ao carregar os cafés, tente novamente mais tarde.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <Flex flexDir="column" gap="5">
      <Heading>Meus Pedidos</Heading>
      <Text fontWeight="600">Histórico</Text>

      <Helmet title="Pedidos" />

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
        {isLoading && <OrdersLoading />}

        {orders?.map((order, index) => (
          <GridItem key={order.id} w="fit-content">
            <OrderCard number={index + 1} order={order} />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  )
}
