import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react'

import BannerIMG from '@/assets/images/banner.png'
import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react'
import { Tag } from '@/components/Tag'

export function Banner() {
  return (
    <Grid
      gap="14"
      w="100%"
      mx="auto"
      mt="5.75rem"
      maxWidth="5xl.5"
      templateColumns="52.5% 1fr"
    >
      <GridItem>
        <Flex flexDirection="column" gap="4">
          <Heading fontSize="3rem" color="gray.900" fontWeight="800">
            Encontre o café perfeito para qualquer hora do dia
          </Heading>
          <Text fontSize="1.25rem" color="gray.800">
            Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
            hora
          </Text>
          <Flex gap="5" mt="3.125rem">
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
        <Box>
          <Image
            src={BannerIMG}
            alt="Banner"
            w="29.75rem"
            h="22.5rem"
            fit="contain"
          />
        </Box>
      </GridItem>
    </Grid>
  )
}
