import { Flex, Grid, GridItem, Heading } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'

import { Banner } from '@/components/Banner'
import { CoffeeCard } from '@/components/CoffeeCard'
import { COFFEE_TYPES } from '@/dto/coffee'

export default function Home() {
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
          {COFFEE_TYPES.map((coffee) => (
            <GridItem key={coffee.id}>
              <CoffeeCard coffee={coffee} />
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </>
  )
}
