import {
  FormControl,
  FormErrorMessage,
  Input as InputUI,
  InputProps,
  Skeleton,
} from '@chakra-ui/react'
import { forwardRef, useImperativeHandle, useRef } from 'react'

type InputUIProps = InputProps & {
  isLoading?: boolean
  errorMessage?: string
  controlWidth?: number | string
}

export const Control = forwardRef<HTMLInputElement, InputUIProps>(
  (
    { errorMessage, controlWidth = 'auto', isLoading = false, ...props },
    outerRef,
  ) => {
    const innerRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(outerRef, () => innerRef.current!, [])

    return (
      <Skeleton
        isLoaded={!isLoading}
        startColor="yellow.200"
        endColor="yellow.500"
        rounded="base"
        w={controlWidth ?? '100%'}
      >
        <FormControl w={controlWidth} isInvalid={!!errorMessage}>
          <InputUI
            ref={outerRef}
            variant="outline"
            p="3"
            fontSize="sm"
            bg="gray.300"
            rounded="base"
            borderColor="gray.400"
            _active={{ borderColor: 'yellow.700' }}
            _focusVisible={{
              borderColor: 'yellow.700',
              boxShadow: '0 0 0 1px yellow.700',
            }}
            _placeholder={{ color: 'gray.550' }}
            {...props}
          />
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
        </FormControl>
      </Skeleton>
    )
  },
)

Control.displayName = 'Control'
