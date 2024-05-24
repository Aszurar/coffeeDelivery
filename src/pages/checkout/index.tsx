import {
  Flex,
  FormControl,
  Grid,
  GridItem,
  Heading,
  Icon,
  Text,
} from '@chakra-ui/react'
import { Bank, CreditCard, MapPinLine, Money } from '@phosphor-icons/react'
import { Helmet } from 'react-helmet-async'

import { SelectButton } from '@/components/SelectButton'

import { AddressesTabs } from './AddressesTabs'
import { CheckoutSubmit } from './CheckoutSubmit'

export function Checkout() {
  return (
    <>
      <Helmet title="Checkout" />
      <Grid
        gap="6"
        w="100%"
        templateColumns={{
          base: '1fr',
          xl: '1fr 28rem',
        }}
      >
        <GridItem>
          <Heading fontSize="lg" color="gray.800">
            Complete seu pedido
          </Heading>

          <Flex
            p={{
              base: '6',
              md: '10',
            }}
            mt="4"
            gap="3"
            as="section"
            flexDir="column"
            bg="gray.200"
            rounded="md"
          >
            <Flex align="flex-start" gap="2">
              <Icon
                as={MapPinLine}
                w="1.375rem"
                h="1.375rem"
                color="yellow.700"
              />
              <Flex flexDir="column" gap="0.5">
                <Text as="h3" fontSize="md" fontFamily="body" color="gray.800">
                  Endereço de Entrega
                </Text>
                <Text fontSize="sm">
                  Informe o endereço onde deseja receber seu pedido
                </Text>
              </Flex>
            </Flex>

            <AddressesTabs />
          </Flex>

          <Flex
            p={{
              base: '6',
              md: '10',
            }}
            mt="4"
            gap="3"
            as="section"
            flexDir="column"
            bg="gray.200"
            rounded="md"
          >
            <Flex align="flex-start" gap="2">
              <Icon
                as={MapPinLine}
                w="1.375rem"
                h="1.375rem"
                color="yellow.700"
              />
              <Flex flexDir="column" gap="0.5">
                <Text as="h3" fontSize="md" fontFamily="body" color="gray.800">
                  Pagamento
                </Text>
                <Text fontSize="sm">
                  O pagamento é feito na entrega. Escolha a forma que deseja
                  pagar
                </Text>
              </Flex>
            </Flex>

            <FormControl
              display="flex"
              gap="3"
              as="fieldset"
              flexDir={{
                base: 'column',
                md: 'row',
              }}
              alignItems={{
                base: 'center',
                md: 'flex-start',
              }}
            >
              <SelectButton
                w={{
                  base: '100%',
                  md: 'auto',
                }}
                icon={CreditCard}
              >
                Cartão de crédito
              </SelectButton>
              <SelectButton
                w={{
                  base: '100%',
                  md: 'auto',
                }}
                icon={Money}
              >
                dinheiro
              </SelectButton>
              <SelectButton
                w={{
                  base: '100%',
                  md: 'auto',
                }}
                icon={Bank}
              >
                Cartão de débito
              </SelectButton>
            </FormControl>
          </Flex>
        </GridItem>

        <GridItem>
          <CheckoutSubmit />
        </GridItem>
      </Grid>
    </>
  )
}
