import { Flex } from '@chakra-ui/react'
import { ElementType } from 'react'

type IconBadgeProps = {
  color: string
  icon: ElementType
}

export function IconBadge({ icon: Icon, color }: IconBadgeProps) {
  return (
    <Flex
      h="8"
      w="8"
      minW="8"
      bg={color}
      color="white"
      align="center"
      justifyContent="center"
      rounded="full"
    >
      <Icon width={16} height={16} weight="fill" />
    </Flex>
  )
}
