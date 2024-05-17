import { Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { Header } from '@/components/Header'

export default function DefaultLayout() {
  return (
    <Flex w="100vw" h="100vh" flexDir="column">
      <Flex w="100%" px="6" mx="auto" maxWidth="5xl.5" flexDir="column">
        <Header />

        <Outlet />
      </Flex>
    </Flex>
  )
}
