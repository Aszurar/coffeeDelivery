import { Input as InputUI, InputProps } from '@chakra-ui/react'

export function Input(props: InputProps) {
  return (
    <InputUI
      variant="outline"
      p="3"
      fontSize="sm"
      bg="gray.300"
      rounded="base"
      borderColor="gray.400"
      _active={{ borderColor: 'yellow.700' }}
      _focusVisible={{
        borderColor: 'yellow.700',
        boxShadow: '0 0 0 1px yellow.700',
      }}
      _placeholder={{ color: 'gray.550' }}
      {...props}
    />
  )
}
