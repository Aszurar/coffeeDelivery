import {
  Flex,
  FormControl,
  Grid,
  GridItem,
  Heading,
  Icon,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react'
import { Bank, CreditCard, MapPinLine, Money } from '@phosphor-icons/react'
import { Helmet } from 'react-helmet-async'

import { Input } from '@/components/Input'
import { SelectButton } from '@/components/SelectButton'

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

            <Flex as="form" flexDir="column" gap="4">
              <Input w="12.5rem" placeholder="CEP" />
              <Input placeholder="Rua" />

              <FormControl
                display="flex"
                as="fieldset"
                flexDir={{
                  base: 'column',
                  md: 'row',
                }}
                gap="3"
              >
                <Input w="12.5rem" minW="12.5rem" placeholder="Número" />
                <InputGroup
                  rounded="base"
                  borderWidth="1px"
                  borderColor="gray.400"
                  _active={{ borderColor: 'yellow.700' }}
                  _focusWithin={{
                    borderWidth: '1px',
                    borderColor: 'yellow.700',
                    boxShadow: '0 0 0 1px yellow.700',
                  }}
                >
                  <Input
                    placeholder="Complemento"
                    _focusVisible={{
                      borderWidth: '0',
                    }}
                  />
                  <InputRightElement
                    fontSize="xs"
                    fontStyle="italic"
                    bg="gray.300"
                    p="3"
                    w="min-content"
                    rounded="base"
                    color="gray.550"
                  >
                    Opcional
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl
                display="flex"
                as="fieldset"
                flexDir={{
                  base: 'column',
                  md: 'row',
                }}
                gap="3"
              >
                <Input w="12.5rem" minW="12.5rem" placeholder="Bairro" />
                <Input placeholder="Cidade" />
                <Input w="3.75rem" minW="3.75rem" placeholder="UF" />
              </FormControl>
            </Flex>
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
