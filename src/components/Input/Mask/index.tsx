import {
  Flex,
  FormControl,
  FormErrorMessage,
  InputGroup,
  Skeleton,
} from '@chakra-ui/react'
import { ComponentPropsWithoutRef } from 'react'
import InputMask from 'react-input-mask'

import styles from './styles.module.css'

type MaskProps = ComponentPropsWithoutRef<'input'> & {
  mask: string
  isLoading?: boolean
  errorMessage?: string
  controlWidth?: number | string
  onChangeValue: (value: string) => void
}

export function Mask({
  mask,
  isLoading = false,
  controlWidth = 'fit-content',
  errorMessage,
  onChangeValue,
  ...props
}: MaskProps) {
  return (
    <Skeleton
      isLoaded={!isLoading}
      startColor="yellow.200"
      endColor="yellow.500"
      rounded="base"
    >
      <Flex flexDir="column" gap="2">
        <FormControl w={controlWidth} isInvalid={!!errorMessage}>
          <InputGroup
            p="2"
            bg="gray.300"
            rounded="base"
            borderWidth={errorMessage ? '2px' : '1px'}
            alignItems="center"
            justifyContent="center"
            fontFamily="body"
            fontSize="sm"
            borderColor={errorMessage ? 'red.500' : 'gray.400'}
          >
            <InputMask
              mask={mask}
              className={styles['input-mask']}
              {...props}
              onChange={(e) => onChangeValue(e.target.value)}
            />
          </InputGroup>
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
        </FormControl>
      </Flex>
    </Skeleton>
  )
}
