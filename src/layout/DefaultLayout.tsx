import { Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
  return (
    <Flex w="100vw" h="100vh" flexDir="column">
      <Flex w="100%" px="6" mx="auto" maxWidth="5xl.5" flexDir="column">
        <Outlet />
      </Flex>
    </Flex>
  )
}
