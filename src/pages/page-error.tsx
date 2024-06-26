import { Center, Flex, Heading, Link, Text } from '@chakra-ui/react'
import { XCircle } from '@phosphor-icons/react'
import { useNavigate, useRouteError } from 'react-router-dom'

import { ROUTES } from '@/router/routes'

export function PageError() {
  const error = useRouteError() as Error
  const navigate = useNavigate()

  return (
    <Center flexDir="column" height="100vh" gap="2">
      <Flex color="purple.500">
        <XCircle size={100} />
      </Flex>
      <Heading>Whoops, algo aconteceu...</Heading>
      <Text>
        Um erro aconteceu na aplicação, abaixo você encontra mais detalhes:
      </Text>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <Text>
        Voltar para a{' '}
        <Link color="purple.500" onClick={() => navigate(ROUTES.HOME)}>
          Tela Inicial
        </Link>
      </Text>
    </Center>
  )
}
