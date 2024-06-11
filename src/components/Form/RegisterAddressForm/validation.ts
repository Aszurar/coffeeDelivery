import * as zod from 'zod'

import { regex, STRING_LENGTH } from '@/utils/string'

const registerAddressFormValidation = zod.object({
  cep: zod
    .string()
    .trim()
    .min(STRING_LENGTH.REQUIRED, { message: 'É obrigatório informar um CEP.' })
    .length(STRING_LENGTH.CEP, { message: 'O CEP deve conter 8 dígitos' })
    .refine((value) => regex.ONLY_NUMBERS.test(value), {
      message: 'O CEP deve conter apenas números',
    }),
  street: zod
    .string()
    .trim()
    .min(STRING_LENGTH.REQUIRED, { message: 'É obrigatório informa uma rua.' }),
  number: zod
    .number({ invalid_type_error: 'É necessário um número válido' })
    .refine((value) => Number(value) > 0, {
      message: 'O número deve ser maior que 0.',
    }),
  complement: zod.string().optional(),
  neighborhood: zod.string().trim().min(STRING_LENGTH.REQUIRED, {
    message: 'É obrigatório informar um bairro.',
  }),
  city: zod.string().trim().min(STRING_LENGTH.REQUIRED, {
    message: 'É obrigatório informar uma cidade.',
  }),
  uf: zod
    .string()
    .trim()
    .min(STRING_LENGTH.REQUIRED, { message: 'É obrigatório informar um UF.' })
    .length(STRING_LENGTH.UF, { message: 'O UF deve conter 2 caracteres.' })
    .refine((value) => regex.ONLY_CHARACTERS.test(value), {
      message: 'O UF deve ser válido.',
    }),
})

type RegisterAddressFormProps = zod.infer<typeof registerAddressFormValidation>

export type { RegisterAddressFormProps }
export { registerAddressFormValidation }
