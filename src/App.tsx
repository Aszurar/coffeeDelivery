import { Header } from '@/components/Header'
import { Flex, Heading } from '@chakra-ui/react'
import { Banner } from './components/Banner'
import { CoffeeCard } from './components/CoffeeCard'

export function App() {
  return (
    <Flex w="100vw" h="100vh" flexDir="column">
      <Header />
      <Banner />
      <Flex
        py="2rem"
        mt="6.75rem"
        gap="3.375rem"
        flexDir="column"
        w="100%"
        mx="auto"
        maxWidth="5xl.5"
      >
        <Heading fontSize="xx-large" fontWeight="800" color="gray.800">
          Nossos cafés
        </Heading>
        <CoffeeCard />
      </Flex>
    </Flex>
  )
}
