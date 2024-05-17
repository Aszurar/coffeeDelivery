import { Flex, Grid, GridItem, Heading, Image, Text } from '@chakra-ui/react'
import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react'

import BannerIMG from '@/assets/images/banner.png'
import { Tag } from '@/components/Tag'

export function Banner() {
  return (
    <Grid
      as="section"
      gap="14"
      w="100%"
      mt="5.75rem"
      templateColumns={{
        base: '1fr',
        lg: '52.5% 1fr',
      }}
    >
      <GridItem>
        <Flex flexDirection="column" gap="4">
          <Heading as="h1" fontSize="5xl" color="gray.900" fontWeight="800">
            Encontre o café perfeito para qualquer hora do dia
          </Heading>
          <Text fontSize="xl" color="gray.800">
            Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
            hora
          </Text>
          <Flex
            gap="5"
            mt="3.125rem"
            flexDir={{
              base: 'column',
              md: 'row',
            }}
            justifyContent="space-between"
          >
            <Flex flexDirection="column" gap="5">
              <Tag
                icon={ShoppingCart}
                color="yellow.700"
                title="Compra simples e segura"
              />
              <Tag
                icon={Timer}
                color="yellow.500"
                title="Entrega rápida e rastreada"
              />
            </Flex>
            <Flex flexDirection="column" gap="5">
              <Tag
                icon={Package}
                color="gray.700"
                title="Embalagem mantém o café intacto"
              />
              <Tag
                icon={Coffee}
                color="purple.500"
                title="O café chega fresquinho até você"
              />
            </Flex>
          </Flex>
        </Flex>
      </GridItem>

      <GridItem>
        <Flex alignItems="center" justifyContent="center">
          <Image
            src={BannerIMG}
            alt="Banner"
            w="29.75rem"
            h="22.5rem"
            fit="contain"
          />
        </Flex>
      </GridItem>
    </Grid>
  )
}
