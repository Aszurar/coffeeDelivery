import { Badge, Center, Flex, Heading, Image, Text } from '@chakra-ui/react'

import { CoffeeTypesProps } from '@/dto/coffee'
import { priceFormatter } from '@/utils/number'

import { CoffeeCardControl } from './CoffeeCardControl'

type CoffeeCardProps = {
  coffee: CoffeeTypesProps
}

export function CoffeeCard({ coffee }: Readonly<CoffeeCardProps>) {
  const price = priceFormatter.format(coffee.price)

  return (
    <Flex
      w="64"
      h="19.375rem"
      px="5"
      pb="5"
      bg="gray.200"
      flexDir="column"
      borderTopLeftRadius="md"
      borderTopRightRadius="36px"
      borderBottomRightRadius="md"
      borderBottomLeftRadius="36px"
      _dark={{
        bg: 'gray.800',
      }}
    >
      <Image
        src={coffee.image}
        alt="Café Expresso Tradicional"
        w="7.5rem"
        h="7.5rem"
        fit="contain"
        alignSelf="center"
        mt="-5"
      />
      <Center mt="3" flexDir="column">
        <Flex gap="1">
          {coffee.tag.map((tag) => (
            <Badge
              key={tag}
              px="2"
              py="1"
              bg="yellow.200"
              color="yellow.750"
              variant="subtle"
              rounded="full"
              fontSize="x-small"
            >
              {tag}
            </Badge>
          ))}
        </Flex>

        <Center flexDir="column" mt="4" gap="2">
          <Heading
            fontSize="xl"
            color="gray.800"
            _dark={{
              color: 'gray.200',
            }}
          >
            {coffee.name}
          </Heading>
          <Text
            fontSize="sm"
            textAlign="center"
            color="gray.600"
            _dark={{
              color: 'gray.500',
            }}
          >
            {coffee.description}
          </Text>
        </Center>

        <Center mt="8">
          <Flex alignItems="flex-end" gap="1" mr="1.5rem">
            <Text fontSize="sm">R$</Text>
            <Heading
              fontSize="2xl"
              fontWeight="800"
              color="gray.800"
              _dark={{
                color: 'gray.200',
              }}
            >
              {price}
            </Heading>
          </Flex>

          <CoffeeCardControl id={coffee.id} />
        </Center>
      </Center>
    </Flex>
  )
}
