import {
  Flex,
  FormControl,
  FormErrorMessage,
  InputGroup,
  Skeleton,
  useColorMode,
  useTheme,
} from '@chakra-ui/react'
import { ComponentPropsWithoutRef } from 'react'
import InputMask from 'react-input-mask'

import styles from './styles.module.css'

type MaskProps = ComponentPropsWithoutRef<'input'> & {
  isBold?: boolean
  mask: string
  isLoading?: boolean
  errorMessage?: string
  controlWidth?: number | string
  onChangeValue: (value: string) => void
}

const errorStyle = {
  borderWidth: '2px',
  light: {
    borderColor: 'red.500',
  },
  dark: {
    borderColor: 'red.300',
  },
}

const defaultColorStyle = {
  borderWidth: '1px',
  light: {
    borderColor: 'gray.400',
  },
  dark: {
    borderColor: 'gray.525',
  },
}

export function Mask({
  mask,
  isBold = false,
  isLoading = false,
  controlWidth = 'fit-content',
  errorMessage,
  onChangeValue,
  ...props
}: MaskProps) {
  const theme = useTheme()
  const { colorMode } = useColorMode()

  const boldStyle = {
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fonts.heading,
  }

  const defaultStyle = {
    fontWeight: theme.fontWeights.normal,
    fontFamily: theme.fonts.body,
  }

  const THEME_MODE = {
    light: {
      placeholderColor: styles['placeholder-light'],
    },
    dark: {
      placeholderColor: styles['placeholder-dark'],
    },
  }

  const fontStyle = isBold ? boldStyle : defaultStyle
  const colorStyle = errorMessage ? errorStyle : defaultColorStyle

  const placeholderStyle = THEME_MODE[colorMode]

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
            borderWidth={colorStyle.borderWidth}
            alignItems="center"
            justifyContent="center"
            fontFamily="body"
            fontSize="sm"
            borderColor={colorStyle.light.borderColor}
            _invalid={{
              borderColor: 'red.500',
            }}
            _dark={{
              bg: 'gray.700',
              color: 'white',
              borderColor: colorStyle.dark.borderColor,
              _placeholder: {
                color: 'gray.500',
              },
              _active: {
                borderColor: 'yellow.400',
              },
              _focusWithin: {
                borderColor: 'yellow.400',
                boxShadow: '0 0 0 1px yellow.400',
              },
            }}
          >
            <InputMask
              mask={mask}
              className={[
                styles['input-mask'],
                placeholderStyle.placeholderColor,
              ].join(' ')}
              style={{
                fontWeight: fontStyle.fontWeight,
                fontFamily: fontStyle.fontFamily,
              }}
              onChange={(e) => onChangeValue(e.target.value)}
              {...props}
            />
          </InputGroup>
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
        </FormControl>
      </Flex>
    </Skeleton>
  )
}
