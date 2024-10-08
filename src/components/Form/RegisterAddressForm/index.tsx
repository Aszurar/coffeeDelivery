import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import * as Input from '@/components/Input'
import * as Toast from '@/components/Toast'
import { REGISTER_ADDRESS_FORM_DEFAULT_VALUES } from '@/dto/address'
import { AppError } from '@/errors'
import { getAddressByCep } from '@/services/api/get-address-by-cep'
import { queryClient } from '@/services/react-query'
import { useAddressSelectors } from '@/store'
import { AddressProps } from '@/store/address'
import { cepValidation, getStringAndRemoveCharacters } from '@/utils/string'

import {
  RegisterAddressFormProps,
  registerAddressFormValidation,
} from './validation'

type RegisterAddressProps = {
  isEditable?: boolean
  onSelectFirstTab: () => void
  onCancelEditAddress: () => void
}

export function RegisterAddressForm({
  isEditable,
  onSelectFirstTab,
  onCancelEditAddress,
}: Readonly<RegisterAddressProps>) {
  const [parent] = useAutoAnimate()
  const toast = useToast()

  const {
    addNewAddress,
    totalAddresses,
    updateAddress,
    maxAddresses,
    selectedAddress,
    incompleteAddress,
    cleanIncompleteAddress,
  } = useAddressSelectors()

  const isNotPossibleAddNewAddress = totalAddresses === maxAddresses

  const {
    watch,
    control,
    formState: { errors, isSubmitting: isSubmittingAddressToSave },
    setError,
    clearErrors,
    handleSubmit,
    register,
    reset,
  } = useForm<RegisterAddressFormProps>({
    defaultValues: REGISTER_ADDRESS_FORM_DEFAULT_VALUES,
    resolver: zodResolver(registerAddressFormValidation),
  })
  const cep = watch('cep')
  const complement = watch('complement')

  const {
    isPending: isGetAddressByCepLoading,
    mutateAsync: getAddressByCepFn,
  } = useMutation({
    mutationFn: getAddressByCep,
    onSuccess: (data) => {
      queryClient.setQueryData(['cepAddress', cep], data)
    },
  })

  const isLoading = isGetAddressByCepLoading || isSubmittingAddressToSave

  async function handleSearchAddressByCep(cepValue: string) {
    clearErrors('cep')
    const isCepValid = cepValidation(cepValue)
    if (isCepValid.isValid) {
      try {
        const response = await getAddressByCepFn({ cep: cepValue })
        const { street, neighborhood, city, state } = response

        reset({
          cep,
          street,
          neighborhood,
          city,
          uf: state,
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

  function handleRegisterNewAddress(data: RegisterAddressFormProps) {
    clearErrors('cep')
    const address: AddressProps = {
      ...data,
      id: crypto.randomUUID(),
    }
    try {
      addNewAddress(address)

      toast({
        title: 'Endereço cadastrado com sucesso!',
        description: 'O novo endereço será usado para entrega.',
        status: 'success',
        duration: 4000,
      })
      onSelectFirstTab()
      reset({
        ...REGISTER_ADDRESS_FORM_DEFAULT_VALUES,
        number: '' as unknown as number,
      })
      cleanIncompleteAddress()
    } catch (error) {
      if (error instanceof AppError) {
        toast({
          title: 'Não é possível adicionar novo endereço',
          description: (
            <Toast.ErrorMessage message={error.message} error={error.details} />
          ),
          status: 'warning',
          duration: 7000,
        })
      } else {
        toast({
          title: 'Erro ao adicionar novo endereço',
          description: (error as Error).message,
          status: 'warning',
        })
      }
    }
  }

  function handleCloseEditAddress() {
    onCancelEditAddress()
    reset({
      ...REGISTER_ADDRESS_FORM_DEFAULT_VALUES,
      number: '' as unknown as number,
    })
  }

  function handleSubmitAddress(data: RegisterAddressFormProps) {
    if (isEditable) {
      handleEditAddress(data)
    } else {
      handleRegisterNewAddress(data)
    }
  }

  function handleEditAddress(data: RegisterAddressFormProps) {
    if (!selectedAddress) {
      toast({
        title: 'Não há endereço selecionado para editar.',
        status: 'info',
      })
      return
    }

    clearErrors('cep')

    const address: AddressProps = {
      ...data,
      id: selectedAddress.id,
    }

    updateAddress(address)

    toast({
      title: 'Endereço atualizado com sucesso!',
      status: 'success',
      duration: 3000,
    })
    handleCloseEditAddress()
  }

  useEffect(() => {
    if (isEditable) {
      if (selectedAddress) {
        reset({
          cep: selectedAddress.cep,
          street: selectedAddress.street,
          number: selectedAddress.number,
          complement: selectedAddress.complement,
          neighborhood: selectedAddress.neighborhood,
          city: selectedAddress.city,
          uf: selectedAddress.uf,
        })
      }
    } else if (incompleteAddress) {
      reset({
        ...incompleteAddress,
      })
    } else {
      reset({
        ...REGISTER_ADDRESS_FORM_DEFAULT_VALUES,
        number: '' as unknown as number,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditable, selectedAddress, totalAddresses, incompleteAddress])

  return (
    <Flex
      as="form"
      flexDir="column"
      gap="4"
      onSubmit={handleSubmit(handleSubmitAddress)}
    >
      <FormControl display="flex" gap="4" alignItems="center">
        <Controller
          control={control}
          name="cep"
          render={({ field }) => (
            <Input.Mask
              isLoading={isLoading}
              mask="99999-999"
              placeholder="CEP"
              controlWidth="12.5rem"
              value={field.value}
              errorMessage={errors.cep?.message}
              onChangeValue={(value) => {
                const cepFormatted = getStringAndRemoveCharacters(value ?? '')
                field.onChange(cepFormatted)
              }}
            />
          )}
        />
        <Button
          isLoading={isLoading}
          colorScheme="yellow"
          leftIcon={<Icon as={MagnifyingGlass} w="6" h="6" />}
          onClick={() => handleSearchAddressByCep(cep)}
        >
          Buscar
        </Button>
      </FormControl>

      <Input.Control
        isLoading={isLoading}
        placeholder="Rua"
        {...register('street')}
        errorMessage={errors.street?.message}
      />

      <FormControl
        display="flex"
        as="fieldset"
        flexDir={{
          base: 'column',
          md: 'row',
        }}
        gap="3"
      >
        <Input.Control
          maxW="12.5rem"
          controlWidth="12.5rem"
          minW="12.5rem"
          placeholder="Número"
          type="number"
          {...register('number', { valueAsNumber: true })}
          errorMessage={errors.number?.message}
        />

        <FormControl isInvalid={!!errors.complement?.message}>
          <InputGroup
            ref={parent}
            w="100%"
            rounded="base"
            borderWidth="1px"
            borderColor="gray.400"
            _active={{ borderColor: 'yellow.700' }}
            _focusWithin={{
              borderWidth: '1px',
              borderColor: 'yellow.700',
              boxShadow: '0 0 0 1px yellow.700',
            }}
            _dark={{
              borderColor: 'gray.525',
              _focusWithin: {
                borderColor: 'yellow.400',
                boxShadow: '0 0 0 1px yellow.400',
              },
            }}
          >
            <Input.Control
              w="100%"
              controlWidth="100%"
              placeholder="Complemento"
              {...register('complement')}
              borderWidth={0}
            />
            {!complement && (
              <InputRightElement
                fontSize="xs"
                fontStyle="italic"
                bg="gray.300"
                p="3"
                w="min-content"
                rounded="base"
                color="gray.550"
                _focus={{ bg: 'yellow.300' }}
                _focusVisible={{ bg: 'yellow.300' }}
                _focusWithin={{ bg: 'yellow.300' }}
                _dark={{
                  bg: 'gray.700',
                  color: 'gray.500',
                }}
              >
                Opcional
              </InputRightElement>
            )}
          </InputGroup>
          <FormErrorMessage>{errors.complement?.message}</FormErrorMessage>
        </FormControl>
      </FormControl>

      <FormControl
        display="flex"
        as="fieldset"
        flexDir={{
          base: 'column',
          md: 'row',
        }}
        gap="3"
      >
        <Input.Control
          w="12.5rem"
          minW="12.5rem"
          placeholder="Bairro"
          {...register('neighborhood')}
          isLoading={isLoading}
          errorMessage={errors.neighborhood?.message}
        />
        <Input.Control
          placeholder="Cidade"
          {...register('city')}
          isLoading={isLoading}
          errorMessage={errors.city?.message}
        />
        <Input.Control
          w="3.75rem"
          controlWidth="fit-content"
          minW="3.75rem"
          textTransform="uppercase"
          placeholder="UF"
          {...register('uf')}
          isLoading={isLoading}
          errorMessage={errors.uf?.message}
        />
      </FormControl>

      <Flex gap="4" justifyContent="flex-end">
        {isEditable && (
          <Button
            type="button"
            variant="ghost"
            colorScheme="purple"
            fontSize="sm"
            fontWeight="700"
            textTransform="uppercase"
            isLoading={isLoading}
            _hover={{
              bg: 'purple.200',
            }}
            _active={{
              bg: 'purple.100',
            }}
            onClick={handleCloseEditAddress}
            _dark={{
              _hover: {
                bg: 'purple.800',
              },
              _active: {
                bg: 'purple.900',
              },
            }}
          >
            Cancelar
          </Button>
        )}

        <Button
          type="submit"
          colorScheme="purple"
          fontSize="sm"
          fontWeight="700"
          textTransform="uppercase"
          isLoading={isLoading}
          isDisabled={isNotPossibleAddNewAddress}
        >
          Salvar
        </Button>
      </Flex>
    </Flex>
  )
}
