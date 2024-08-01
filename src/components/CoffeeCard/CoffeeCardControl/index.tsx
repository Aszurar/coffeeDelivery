import { IconButton, useToast } from '@chakra-ui/react'
import { ShoppingCart } from '@phosphor-icons/react'
import { useState } from 'react'

import { Counter } from '@/components/Counter'
import { useCartSelectors } from '@/store'

const COUNTER_INITIAL_VALUE = 1

type CoffeeCardControlProps = {
  id: string
  name: string
  price: number
}

export function CoffeeCardControl({
  id,
  name,
  price,
}: Readonly<CoffeeCardControlProps>) {
  const { addItemToCart } = useCartSelectors()

  const [counter, setCounter] = useState(COUNTER_INITIAL_VALUE)
  const counterIsZero = counter === 0
  const toast = useToast()

  function handleIncrement() {
    setCounter(counter + 1)
  }

  function handleDecrement() {
    if (counter >= COUNTER_INITIAL_VALUE) {
      setCounter(counter - 1)
    }
  }

  function handleAddItem() {
    addItemToCart({ id, name, price, quantity: counter })
    setCounter(COUNTER_INITIAL_VALUE)
    toast({
      title: 'Item adicionado ao carrinho.',
      status: 'success',
      duration: 2000,
    })
  }

  return (
    <>
      <Counter
        counter={counter}
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
      />

      <IconButton
        w="2.375rem"
        minW="2.375rem"
        h="2.375rem"
        ml="2"
        rounded="md"
        color="white"
        bg="purple.700"
        isDisabled={counterIsZero}
        _hover={{
          bg: 'purple.500',
          _disabled: {
            bg: 'purple.700',
          },
        }}
        _active={{
          bg: 'purple.700',
        }}
        aria-label="Adicionar ao carrinho de compras"
        icon={<ShoppingCart width={22} height={22} weight="fill" />}
        onClick={handleAddItem}
      />
    </>
  )
}
