import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Image,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { Trash } from '@phosphor-icons/react'

import { CoffeeTypesProps } from '@/dto/coffee'
import { useStore } from '@/store'
import { priceFormatterWithCurrency } from '@/utils/number'

import { Counter } from '../Counter'
import { SelectButton } from '../SelectButton'

type CartCardProps = {
  coffee: Omit<CoffeeTypesProps, 'description' | 'tag'>
}

export function CartCard({ coffee }: CartCardProps) {
  const {
    handleRemoveItem,
    handleDecrementQuantityItemOnCart,
    handleIncrementQuantityItemOnCart,
    onGetTotalCurrentItem,
  } = useStore((state) => {
    return {
      handleRemoveItem: state.removeItemFromCart,
      onGetTotalCurrentItem: state.getTotalCurrentItem,
      handleDecrementQuantityItemOnCart: state.decrementQuantityItemOnCart,
      handleIncrementQuantityItemOnCart: state.incrementQuantityItemOnCart,
    }
  })

  const totalCurrentItem = onGetTotalCurrentItem({ id: coffee.id })
  const totalPrice = totalCurrentItem * coffee.price
  const priceFormatted = priceFormatterWithCurrency.format(totalPrice)
  return (
    <Card
      flexDir="row"
      variant="unstyled"
      bg="transparent"
      align="center"
      gap={{
        base: '3',
        md: '5',
      }}
    >
      <CardHeader>
        <Image
          src={coffee.image}
          alt="Café Expresso Tradicional"
          w={{
            base: '12',
            md: '16',
          }}
          h={{
            base: '12',
            md: '16',
          }}
          fit="contain"
          alignSelf="center"
        />
      </CardHeader>
      <CardBody>
        <Text as="h3" fontSize="md" fontFamily="body" color="gray.800">
          {coffee.name}
        </Text>

        <Flex mt="2" align="center" gap="2">
          <Counter
            counter={totalCurrentItem}
            onDecrement={() =>
              handleDecrementQuantityItemOnCart({ id: coffee.id })
            }
            onIncrement={() =>
              handleIncrementQuantityItemOnCart({ id: coffee.id })
            }
            h="8"
          />
          <SelectButton
            p="2"
            h="8"
            w="fit-content"
            icon={Trash}
            onClick={() => handleRemoveItem({ id: coffee.id })}
          >
            Remover
          </SelectButton>
        </Flex>
      </CardBody>
      <Spacer />
      <CardFooter display="flex" alignSelf="flex-start">
        <Text fontWeight="700">{priceFormatted}</Text>
      </CardFooter>
    </Card>
  )
}
