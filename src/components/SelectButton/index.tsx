import { Button, ButtonProps, useToken } from '@chakra-ui/react'
import { ElementType } from 'react'

type SelectButtonProps = ButtonProps & {
  icon: ElementType
}

export function SelectButton({
  icon: Icon,
  variant,
  ...rest
}: SelectButtonProps) {
  const [purple400] = useToken('colors', ['purple.400'])

  return (
    <Button
      p="4"
      bg="gray.400"
      h="3.1875rem"
      w="11.125rem"
      textTransform="uppercase"
      fontWeight="400"
      fontSize="xs"
      color="gray.700"
      justifyContent="start"
      borderWidth={1}
      borderColor="transparent"
      _hover={{
        bg: 'gray.500',
      }}
      _active={{
        bg: 'purple.200',
        borderColor: variant === 'outline' ? 'purple.500' : 'transparent',
      }}
      leftIcon={<Icon color={purple400} width={16} height={16} />}
      {...rest}
      _dark={{
        bg: 'gray.700',
        color: 'gray.300',
        _hover: {
          bg: 'gray.700',
          opacity: 0.75,
        },
        _active: {
          bg: 'purple.900',
          borderColor: variant === 'outline' ? 'purple.400' : 'transparent',
        },
      }}
    />
  )
}
