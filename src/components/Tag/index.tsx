import { Flex, Text } from '@chakra-ui/react'
import { ElementType } from 'react'

import { IconBadge } from '../IconBadge'

type TagProps = {
  icon: ElementType
  title: string
  color: string
}

export function Tag({ color, icon, title }: TagProps) {
  return (
    <Flex gap="3" align="center">
      <IconBadge color={color} icon={icon} />
      <Text>{title}</Text>
    </Flex>
  )
}
