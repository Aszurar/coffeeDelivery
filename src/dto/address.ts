import { RegisterAddressFormProps } from '@/components/Form/RegisterAddressForm/validation'

export interface ICepAddressBrasilAPI {
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  service: string
}

type RegisterAddressDefaultValueProps = Omit<RegisterAddressFormProps, 'number'>

const REGISTER_ADDRESS_FORM_DEFAULT_VALUES: RegisterAddressDefaultValueProps = {
  cep: '',
  street: '',
  complement: '',
  neighborhood: '',
  city: '',
  uf: '',
}

export { REGISTER_ADDRESS_FORM_DEFAULT_VALUES }
