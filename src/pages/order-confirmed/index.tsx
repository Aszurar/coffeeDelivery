import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react'
import { CurrencyDollar, MapPin, Timer } from '@phosphor-icons/react'
import { Helmet } from 'react-helmet-async'

import DeliveryPNG from '@/assets/images/delivery.png'
import { IconBadge } from '@/components/IconBadge'
import { PAYMENT_TYPE_VALUES } from '@/dto/payment'
import { useOrderSelectors } from '@/store'

export function OrderConfirmed() {
  const { currentOrder } = useOrderSelectors()

  return (
    <>
      <Helmet title="Pedido confirmado" />
      <Box
        mt={{ base: '8', md: '5.75rem' }}
        p={{ base: '2', md: '6', lg: '8', xl: '10' }}
      >
        <Heading
          fontSize="4xl.5"
          color="yellow.700"
          _dark={{
            color: 'yellow.300',
          }}
        >
          Uhu! Pedido confirmado
        </Heading>
        <Text
          mt="1"
          color="gray.800"
          fontSize="xl"
          _dark={{
            color: 'gray.200',
          }}
        >
          Agora é só aguardar que logo o café chegará até você
        </Text>
      </Box>
      <Grid
        as="section"
        gap={{ base: '6', md: '8', lg: '10', xl: '12' }}
        w="100%"
        templateColumns={{
          base: '1fr',
          md: '1fr 44%',
        }}
      >
        <GridItem>
          <Flex
            p={{ base: '2', md: '6', lg: '8', xl: '10' }}
            mt={{
              base: '4',
              md: '6',
              lg: '8',
              xl: '10',
            }}
            gap="8"
            flexDir="column"
          >
            <Flex gap="3" align="center">
              <IconBadge color="purple.500" icon={MapPin} />
              <Flex flexDir="column">
                <Flex gap="1">
                  <Text>
                    Entrega em{' '}
                    <strong>
                      {currentOrder?.address?.street},{' '}
                      {currentOrder?.address?.number}
                    </strong>
                  </Text>
                </Flex>
                <Text>
                  {currentOrder?.address?.neighborhood} -{' '}
                  {currentOrder?.address?.city}, {currentOrder?.address?.uf}
                </Text>
              </Flex>
            </Flex>

            <Flex gap="3" align="center">
              <IconBadge color="yellow.500" icon={Timer} />
              <Flex flexDir="column">
                <Text>Previsão de entrega</Text>
                <Text fontWeight="700">20 min - 30 min</Text>
              </Flex>
            </Flex>

            <Flex gap="3" align="center">
              <IconBadge color="yellow.700" icon={CurrencyDollar} />
              <Flex flexDir="column">
                <Text>Pagamento na entrega</Text>
                <Text fontWeight="700">
                  {PAYMENT_TYPE_VALUES[currentOrder?.paymentType ?? 0]}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex flex={1} h="100%" alignItems="flex-end">
            <Image
              src={DeliveryPNG}
              alt="Pedido confirmado"
              w="30.75rem"
              h="18.3125rem"
              fit="contain"
            />
          </Flex>
        </GridItem>
      </Grid>
    </>
  )
}
