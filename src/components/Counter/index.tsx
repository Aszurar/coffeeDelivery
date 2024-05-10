import { useState } from 'react'
import { Box, Flex, IconButton, Text } from '@chakra-ui/react'
import { Minus, Plus } from '@phosphor-icons/react'

const COUNTER_INITIAL_VALUE = 1

export function Counter() {
  const [counter, setCounter] = useState(COUNTER_INITIAL_VALUE)

  function handleIncrement() {
    setCounter(counter + 1)
  }

  function handleDecrement() {
    if (counter > COUNTER_INITIAL_VALUE) {
      setCounter(counter - 1)
    }

    if (counter === COUNTER_INITIAL_VALUE) {
      // Remove item from cart
    }
  }

  return (
    <Flex gap="2" bg="gray.400" alignItems="center" rounded="md">
      <IconButton
        w="5"
        minW="5"
        h="2.375rem"
        borderLeftRadius="md"
        borderRightRadius={0}
        color="purple.500"
        bg="gray.400"
        _hover={{
          bg: 'gray.500',
        }}
        _active={{
          bg: 'gray.400',
        }}
        aria-label="Remover 1 unidade do carrinho de compras"
        icon={<Minus width={14} height={14} />}
        onClick={handleDecrement}
      />

      <Box>
        <Text color="gray.900">{counter}</Text>
      </Box>

      <IconButton
        w="5"
        minW="5"
        h="2.375rem"
        bg="gray.400"
        color="purple.500"
        borderRightRadius="md"
        borderLeftRadius={0}
        _hover={{
          bg: 'gray.500',
        }}
        _active={{
          bg: 'gray.400',
        }}
        aria-label="Adicionar 1 unidade ao carrinho de compras"
        icon={<Plus width={14} height={14} />}
        onClick={handleIncrement}
      />
    </Flex>
  )
}
