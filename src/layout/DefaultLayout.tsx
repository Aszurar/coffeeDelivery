import { Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { Header } from '@/components/Header'

export default function DefaultLayout() {
  return (
    <Flex
      // minW="100vw"
      minH="100vh"
      flexDir="column"
      bg="gray.100"
      _dark={{
        bg: 'gray.900',
        color: 'gray.300',
      }}
    >
      <Flex w="100%" px="6" mx="auto" maxWidth="5xl.5" flexDir="column">
        <Header />

        <Outlet />
      </Flex>
    </Flex>
  )
}
