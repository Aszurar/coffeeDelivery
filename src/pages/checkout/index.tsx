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
import { PAYMENT_TYPE } from '@/dto/payment'
import { usePaymentSelectors } from '@/store'

import { AddressesTabs } from './AddressesTabs'
import { CheckoutSubmit } from './CheckoutSubmit'

export function Checkout() {
  const { updatePaymentType, paymentType } = usePaymentSelectors()

  return (
    <>
      <Helmet title="Checkout" />
      <Grid
        gap="6"
        w="100%"
        as="main"
        templateColumns={{
          base: '1fr',
          xl: '1fr 28rem',
        }}
      >
        <GridItem>
          <Heading
            fontSize="lg"
            as="h1"
            color="gray.800"
            _dark={{
              color: 'gray.200',
            }}
          >
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
            _dark={{
              bg: 'gray.800',
            }}
          >
            <Flex align="flex-start" gap="2">
              <Icon
                as={MapPinLine}
                w="1.375rem"
                h="1.375rem"
                color="yellow.700"
                _dark={{
                  color: 'yellow.400',
                }}
              />
              <Flex flexDir="column" gap="0.5">
                <Text
                  fontSize="md"
                  fontFamily="body"
                  color="gray.800"
                  _dark={{
                    color: 'gray.200',
                  }}
                >
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
            _dark={{
              bg: 'gray.800',
            }}
          >
            <Flex align="flex-start" gap="2">
              <Icon
                as={MapPinLine}
                w="1.375rem"
                h="1.375rem"
                color="yellow.400"
              />
              <Flex flexDir="column" gap="0.5">
                <Text
                  fontSize="md"
                  fontFamily="body"
                  color="gray.800"
                  _dark={{
                    color: 'gray.200',
                  }}
                >
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
                variant="outline"
                w={{
                  base: '100%',
                  md: 'auto',
                }}
                icon={CreditCard}
                isActive={paymentType === PAYMENT_TYPE.CREDIT_CARD}
                onClick={() => updatePaymentType(PAYMENT_TYPE.CREDIT_CARD)}
              >
                Cartão de crédito
              </SelectButton>
              <SelectButton
                variant="outline"
                w={{
                  base: '100%',
                  md: 'auto',
                }}
                icon={Money}
                isActive={paymentType === PAYMENT_TYPE.MONEY}
                onClick={() => updatePaymentType(PAYMENT_TYPE.MONEY)}
              >
                dinheiro
              </SelectButton>
              <SelectButton
                variant="outline"
                w={{
                  base: '100%',
                  md: 'auto',
                }}
                icon={Bank}
                isActive={paymentType === PAYMENT_TYPE.DEBIT_CARD}
                onClick={() => updatePaymentType(PAYMENT_TYPE.DEBIT_CARD)}
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
