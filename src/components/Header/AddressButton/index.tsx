import {
  Box,
  Button,
  Flex,
  FormControl,
  Highlight,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useToast,
  useToken,
} from '@chakra-ui/react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass, MapPin } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as zod from 'zod'

import * as Input from '@/components/Input'
import * as Toast from '@/components/Toast'
import { DELIVERY_PRICE } from '@/dto/delivery'
import { AppError } from '@/errors'
import { getAddressByCep } from '@/services/api/get-address-by-cep'
import { queryClient } from '@/services/react-query'
import { useAddressSelectors } from '@/store'
import { priceFormatterWithCurrency } from '@/utils/number'
import {
  cepValidation,
  getStringAndRemoveCharacters,
  regex,
  STRING_LENGTH,
} from '@/utils/string'

const searchAddressValidation = zod.object({
  cep: zod
    .string()
    .trim()
    .min(STRING_LENGTH.REQUIRED, { message: 'É obrigatório informar um CEP.' })
    .length(STRING_LENGTH.CEP, { message: 'O CEP deve conter 8 dígitos' })
    .refine((value) => regex.ONLY_NUMBERS.test(value), {
      message: 'O CEP deve conter apenas números',
    }),
})

type SearchAddressValidationFormProps = zod.infer<
  typeof searchAddressValidation
>

const SEARCH_ADDRESS_FORM_DEFAULT = {
  cep: '',
}

export function AddressButton() {
  const toast = useToast()
  const [parent] = useAutoAnimate()
  const { selectedAddress, addIncompleteAddressOnSelectedAddress } =
    useAddressSelectors()
  const initialFocusRef = useRef<HTMLButtonElement>(null)
  const [purple500, gray600] = useToken('colors', ['purple.500', 'gray.600'])

  const localizationEmpty = {
    bg: 'gray.300',
    color: 'gray.600',
    hover: {
      bg: 'gray.400',
    },
    active: {
      bg: 'gray.500',
    },
    iconColor: gray600,
    label: 'Selecione sua localização',
  }
  const localizationFilled = {
    bg: 'purple.200',
    color: 'purple.700',
    hover: {
      bg: 'purple.100',
    },
    active: {
      bg: 'purple.200',
    },
    iconColor: purple500,
    label: `${selectedAddress?.city}, ${selectedAddress?.uf}`,
  }

  const localizationButtonLabel = selectedAddress
    ? localizationFilled
    : localizationEmpty

  const {
    watch,
    control,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    handleSubmit,
  } = useForm<SearchAddressValidationFormProps>({
    defaultValues: SEARCH_ADDRESS_FORM_DEFAULT,
    resolver: zodResolver(searchAddressValidation),
  })

  const cep = watch('cep')

  const hasSelectedAddress =
    selectedAddress?.cep === getStringAndRemoveCharacters(cep)

  const { isPending, mutateAsync: getAddressByCepFn } = useMutation({
    mutationFn: getAddressByCep,
    onSuccess: (data) => {
      queryClient.setQueryData(['selectedAddress'], data)
    },
  })

  const isLoading = isPending || isSubmitting

  const deliveryPriceFormatted =
    priceFormatterWithCurrency.format(DELIVERY_PRICE)

  async function handleSearchAddressByCep(
    data: SearchAddressValidationFormProps,
  ) {
    clearErrors('cep')
    const isCepValid = cepValidation(data.cep)
    if (isCepValid.isValid) {
      try {
        const response = await getAddressByCepFn({ cep: data.cep })
        addIncompleteAddressOnSelectedAddress({
          cep: response.cep,
          uf: response.state,
          city: response.city,
          street: response.street,
          neighborhood: response.neighborhood,
        })
      } catch (error) {
        if (error instanceof AppError) {
          toast({
            title: 'Erro ao buscar endereço.',
            description: (
              <Toast.ErrorMessage
                message="Verifique o cep e tente novamente."
                error={error.message}
              />
            ),
            status: 'error',
            duration: 7000,
          })
        } else {
          toast({
            title: 'Erro ao buscar endereço,',
            description: (error as Error).message,
            status: 'error',
          })
        }
      }
    } else {
      setError('cep', {
        type: 'manual',
        message: isCepValid.message,
      })
    }
  }

  return (
    <Popover initialFocusRef={initialFocusRef} placement="bottom">
      <PopoverTrigger>
        <Button
          p="2"
          h="fit-content"
          rounded="md"
          fontSize="sm"
          fontWeight={400}
          bg={localizationButtonLabel.bg}
          color={localizationButtonLabel.color}
          leftIcon={
            <MapPin
              weight="fill"
              color={localizationButtonLabel.iconColor}
              width={22}
              height={22}
            />
          }
          _hover={{
            bg: localizationButtonLabel.hover.bg,
          }}
          _active={{
            bg: localizationButtonLabel.active.bg,
          }}
        >
          {localizationButtonLabel.label}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        bg="white"
        borderColor="purple.500"
        _dark={{
          bg: 'gray.800',
          borderColor: 'purple.300',
        }}
      >
        <PopoverHeader
          color="purple.500"
          pt="4"
          fontWeight="bold"
          border="0"
          _dark={{
            color: 'purple.200',
          }}
        >
          Consulte o Frete
        </PopoverHeader>
        <PopoverArrow
          bg="white"
          borderColor="purple.500"
          borderTopWidth={1}
          borderLeftWidth={1}
          _dark={{
            bg: 'gray.900',
            borderColor: 'purple.300',
          }}
        />
        <PopoverCloseButton />
        <PopoverBody>
          <FormControl display="flex" gap="4" alignItems="start">
            <Controller
              control={control}
              name="cep"
              render={({ field }) => (
                <Input.Mask
                  isLoading={isLoading}
                  isBold
                  mask="99999-999"
                  placeholder="Inserir CEP"
                  controlWidth="12.5rem"
                  value={field.value}
                  errorMessage={errors.cep?.message}
                  onChangeValue={(value) => {
                    const cepFormatted = getStringAndRemoveCharacters(
                      value ?? '',
                    )
                    field.onChange(cepFormatted)
                  }}
                />
              )}
            />

            <IconButton
              p="3"
              colorScheme="purple"
              type="submit"
              rounded="md"
              aria-label="Pesquisar endereço pelo CEP"
              icon={<MagnifyingGlass width={24} height={24} />}
              onClick={handleSubmit(handleSearchAddressByCep)}
            />
          </FormControl>
        </PopoverBody>
        <PopoverFooter
          border="0"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        >
          <Box ref={parent}>
            {hasSelectedAddress && (
              <Flex fontSize="sm">
                <Highlight
                  query={['Entrega Econômica:']}
                  styles={{
                    fontWeight: '700',
                    fontFamily: 'heading',
                    mr: 2,
                  }}
                >
                  Entrega Econômica:
                </Highlight>
                <Text fontWeight="bold" color="purple.500">
                  {deliveryPriceFormatted}
                </Text>
              </Flex>
            )}
          </Box>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
