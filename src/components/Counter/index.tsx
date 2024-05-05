import { Box, Flex, IconButton, Text } from '@chakra-ui/react'
import { Minus, Plus } from '@phosphor-icons/react'

export function Counter() {
  return (
    <Flex gap="0.5rem" bg="gray.400" alignItems="center" rounded="md">
      <IconButton
        w="1.25rem"
        minW="1.25rem"
        h="2.375rem"
        borderLeftRadius="6px"
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
      />

      <Box>
        <Text color="gray.900">1</Text>
      </Box>

      <IconButton
        w="1.25rem"
        minW="1.25rem"
        h="2.375rem"
        bg="gray.400"
        color="purple.500"
        borderRightRadius="6px"
        borderLeftRadius={0}
        _hover={{
          bg: 'gray.500',
        }}
        _active={{
          bg: 'gray.400',
        }}
        aria-label="Adicionar 1 unidade ao carrinho de compras"
        icon={<Plus width={14} height={14} />}
      />
    </Flex>
  )
}
