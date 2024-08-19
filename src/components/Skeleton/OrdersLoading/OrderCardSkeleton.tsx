import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Skeleton,
  Text,
} from '@chakra-ui/react'

export function OrderCardSkeleton() {
  return (
    <Card
      w={{
        base: 'xs',
        lg: 'sm',
      }}
      borderColor="purple.200"
      borderWidth="1px"
      _dark={{
        borderColor: 'purple.900',
      }}
    >
      <CardHeader>
        <Flex gap="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Skeleton height="50px" w="50px" rounded="full" />

            <Flex flexDir="column" gap="2">
              <Skeleton w="36" h="4" />
              <Skeleton w="32" h="3" />
              <Skeleton w="48" h="3" />
            </Flex>
          </Flex>
        </Flex>
      </CardHeader>

      <Divider
        borderColor="purple.300"
        _dark={{
          borderColor: 'purple.600',
        }}
      />

      <CardBody>
        <Flex flexDir="column">
          <Flex ml="4" alignItems="center" gap="2">
            <Skeleton w="22px" h="22px" rounded="full" />
            <Flex flexDir="column" gap="2">
              <Skeleton w="36" h="3.5" />
              <Skeleton w="24" h="3.5" />
            </Flex>
          </Flex>

          <Skeleton ml="4" mt="3.5" w="48" h="3.5" />

          <Skeleton ml="4" mt="2" w="32" h="3" />
        </Flex>
      </CardBody>

      <Divider
        borderColor="purple.300"
        _dark={{
          borderColor: 'purple.600',
        }}
      />

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <Flex flexDir="column">
          <Skeleton h="12">
            <Text>
              Rua Agente Fiscal Paulo de Assis, 57, Jardim Oceania, 58037535,
              João Pessoa, PB.
            </Text>
          </Skeleton>
          <Skeleton mt="2" alignSelf="center">
            Adicionar ao carrinho
          </Skeleton>
        </Flex>
      </CardFooter>
    </Card>
  )
}
