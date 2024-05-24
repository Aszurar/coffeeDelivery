import { Box, Text } from '@chakra-ui/react'

type ErrorMessageProps = {
  message?: string
  error?: string
}

export function ErrorMessage({ message, error }: ErrorMessageProps) {
  return (
    <Box>
      <Text>{message}</Text>
      {!!error && <Text>{error}</Text>}
    </Box>
  )
}
