import { Box, Flex, IconButton, Text } from '@chakra-ui/react'
import { Minus, Plus } from '@phosphor-icons/react'

type CounterProps = {
  h?: string
  counter: number
  onIncrement: () => void
  onDecrement: () => void
}

export function Counter({
  h = '2.375rem',
  counter,
  onDecrement,
  onIncrement,
}: CounterProps) {
  return (
    <Flex
      gap="2"
      bg="gray.400"
      alignItems="center"
      rounded="md"
      w="fit-content"
      h={h}
    >
      <IconButton
        w="5"
        minW="5"
        h={h}
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
        onClick={onDecrement}
      />

      <Box>
        <Text color="gray.900">{counter}</Text>
      </Box>

      <IconButton
        w="5"
        minW="5"
        h={h}
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
        onClick={onIncrement}
      />
    </Flex>
  )
}
