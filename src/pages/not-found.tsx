import { Center, Heading, Link, Text } from '@chakra-ui/react'
import { Prohibit } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/router/routes'

export function NotFound() {
  const navigate = useNavigate()
  return (
    <Center h="100vh" flexDir="column" gap="2">
      <Center color="red.500">
        <Prohibit size={100} />
      </Center>
      <Text>Erro 404</Text>
      <Heading className="text-4xl font-bold">Página não encontrada</Heading>
      <Text className="text-accent-foreground">
        Voltar para a{' '}
        <Link color="purple.500" onClick={() => navigate(ROUTES.HOME)}>
          Tela Inicial
        </Link>
      </Text>
    </Center>
  )
}
