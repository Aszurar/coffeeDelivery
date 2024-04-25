import { Header } from '@/components/Header'
import { Flex } from '@chakra-ui/react'
import { Banner } from './components/Banner'

export function App() {
  return (
    <Flex w="100vw" h="100vh" flexDirection="column">
      <Header />
      <Banner />
    </Flex>
  )
}
