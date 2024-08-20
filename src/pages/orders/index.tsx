import { Flex, Grid, GridItem, Heading, Text, useToast } from '@chakra-ui/react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

import { OrderCardMemo } from '@/components/OrderCard'
import { OrdersLoading } from '@/components/Skeleton/OrdersLoading'
import { getOrders } from '@/services/api/get-orders'
import { useCartSelectors } from '@/store'
import { CartProps } from '@/store/cart'

export function OrderHistoric() {
  const toast = useToast()
  const [parent] = useAutoAnimate()
  const { addItemToCart } = useCartSelectors()
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
          mt: '8',
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

  return (
    <Flex flexDir="column" gap="5" as="main">
      <Heading as="h1">Meus Pedidos</Heading>
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
