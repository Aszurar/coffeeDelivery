import { Banner } from '@/components/Banner'
import { CoffeeCard } from '@/components/CoffeeCard'
import { Header } from '@/components/Header'
import { COFFEE_TYPES } from '@/dto/coffee'

import { Flex, Grid, GridItem, Heading } from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <Flex
        as="main"
        w="100%"
        py="8"
        mt="6.75rem"
        gap="2.125rem"
        flexDir="column"
      >
        <Heading fontSize="xx-large" fontWeight="800" color="gray.800">
          Nossos cafés
        </Heading>
        <Grid
          gap="8"
          w="100%"
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
            xl: 'repeat(4, 1fr)',
          }}
        >
          {COFFEE_TYPES.map((coffee) => (
            <GridItem key={coffee.id}>
              <Flex alignItems="center" justifyContent="center">
                <CoffeeCard
                  id={coffee.id}
                  name={coffee.name}
                  description={coffee.description}
                  tag={coffee.tag}
                  price={coffee.price}
                  image={coffee.image}
                />
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </>
  )
}
