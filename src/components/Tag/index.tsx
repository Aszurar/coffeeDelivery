import { ElementType } from 'react'
import { Flex, Text } from '@chakra-ui/react'

type TagProps = {
  icon: ElementType
  title: string
  color: string
}

export function Tag({ color, icon: Icon, title }: TagProps) {
  return (
    <Flex gap="3" align="center">
      <Flex
        p="2"
        bg={color}
        color="white"
        align="center"
        w="fit-content"
        rounded="full"
      >
        <Icon width={16} height={16} weight="fill" />
      </Flex>
      <Text>{title}</Text>
    </Flex>
  )
}
