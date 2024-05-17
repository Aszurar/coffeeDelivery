import { IconButton } from '@chakra-ui/react'
import { ShoppingCart } from '@phosphor-icons/react'
import { useState } from 'react'

import { Counter } from '@/components/Counter'
import { useStore } from '@/components/store'

const COUNTER_INITIAL_VALUE = 1

type CoffeeCardControlProps = {
  id: string
}

export function CoffeeCardControl({ id }: CoffeeCardControlProps) {
  const addItemToCart = useStore((state) => state.addItemToCart)

  const [counter, setCounter] = useState(COUNTER_INITIAL_VALUE)
  const counterIsZero = counter === 0

  function handleIncrement() {
    setCounter(counter + 1)
  }

  function handleDecrement() {
    if (counter >= COUNTER_INITIAL_VALUE) {
      setCounter(counter - 1)
    }
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
        onClick={() => addItemToCart({ id, quantity: counter })}
      />
    </>
  )
}
