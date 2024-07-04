import { Card, CardBody, Center, Icon, Text } from '@chakra-ui/react'
import { ElementType } from 'react'

type AddressesEmptyCardProps = {
  icon: ElementType
  title: string
}

export function AddressesEmptyCard({ icon, title }: AddressesEmptyCardProps) {
  return (
    <Card
      flexDir="row"
      w="100%"
      variant="elevated"
      bg="transparent"
      align="center"
      gap={{
        base: '3',
        md: '5',
      }}
    >
      <CardBody bg="transparent">
        <Center flexDir="column">
          <Icon
            as={icon}
            w="16"
            h="16"
            color="yellow.700"
            _dark={{
              color: 'yellow.400',
            }}
          />
          <Text
            fontSize="md"
            fontWeight="600"
            fontFamily="body"
            color="yellow.800"
            _dark={{
              color: 'yellow.200',
            }}
          >
            {title}
          </Text>
        </Center>
      </CardBody>
    </Card>
  )
}
