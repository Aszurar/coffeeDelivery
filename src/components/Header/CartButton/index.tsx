import {
  Badge,
  Box,
  IconButton,
  useDisclosure,
  useToken,
} from '@chakra-ui/react'
import { ShoppingCart } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

import { CartDrawer } from '@/components/ModalDialogAndDrawer/CartDrawer'
import { useCartSelectors } from '@/store'

export function CartButton() {
  const MotionBadge = motion(Badge)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { totalItemsOnCart } = useCartSelectors()
  const [yellow500, yellow50] = useToken('colors', ['yellow.500', 'yellow.50'])

  return (
    <>
      <CartDrawer isOpen={isOpen} onClose={onClose} />

      <Box position="relative">
        <IconButton
          w="2.375rem"
          h="2.375rem"
          minW="2.375rem"
          rounded="md"
          bg="yellow.200"
          color="yellow.700"
          aria-label="Carrinho de compras"
          _hover={{
            bg: 'yellow.300',
          }}
          _active={{
            bg: 'yellow.200',
          }}
          icon={<ShoppingCart width={22} height={22} weight="fill" />}
          onClick={onOpen}
        />
        {!!totalItemsOnCart && (
          <MotionBadge
            as={MotionBadge}
            variant="solid"
            h="5"
            w="5"
            display="flex"
            justifyContent="center"
            alignItems="center"
            rounded="full"
            bg="yellow.700"
            position="absolute"
            top="-2"
            right="-2"
            shadow="md"
            animate={{
              boxShadow: [`0 0 0 0 ${yellow500}`, `0 0 0 10px ${yellow50}`],
            }}
            transition={{
              duration: 1.25,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            {totalItemsOnCart}
          </MotionBadge>
        )}
      </Box>
    </>
  )
}
