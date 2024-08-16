import { Flex, Grid, GridItem, Heading, useToast } from '@chakra-ui/react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

import { Banner } from '@/components/Banner'
import { CoffeeCard } from '@/components/CoffeeCard'
import { HomeLoading } from '@/components/Skeleton/HomeLoading'
import { getCoffees } from '@/services/api/get-coffees'

export default function Home() {
  const toast = useToast()
  const [parent] = useAutoAnimate()

  const {
    data: coffees,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['coffees'],
    queryFn: getCoffees,
  })

  if (isError) {
    toast({
      title: 'Erro ao carregar cafés',
      description:
        'Ocorreu um erro ao carregar os cafés, tente novamente mais tarde.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <>
      <Helmet title="Home" />
      <Banner />
      <Flex
        as="main"
        w="100%"
        py="8"
        mt="6.75rem"
        gap="2.125rem"
        flexDir="column"
      >
        <Heading
          fontSize="xx-large"
          fontWeight="800"
          color="gray.800"
          _dark={{
            color: 'gray.200',
          }}
        >
          Nossos cafés
        </Heading>
        <Grid
          ref={parent}
          gap="8"
          w="100%"
          justifyItems="center"
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
            xl: 'repeat(4, 1fr)',
          }}
        >
          {isLoading && <HomeLoading />}

          {coffees?.map((coffee) => (
            <GridItem key={coffee.id}>
              <CoffeeCard coffee={coffee} />
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </>
  )
}
