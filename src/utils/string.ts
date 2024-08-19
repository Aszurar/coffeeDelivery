const STRING_LENGTH = {
  CEP: 8,
  UF: 2,
  REQUIRED: 1,
} as const

const regex = {
  ONLY_NUMBERS: /^\d+$/,
  ONLY_CHARACTERS: /^[a-zA-Z]+$/,
}
/**
 * Remove caracteres não numéricos de uma string.
 *
 * Esta função recebe uma string e remove todos os caracteres que não são dígitos.
 *
 * @param {string} value - A string da qual os caracteres não numéricos serão removidos.
 * @returns {string} Retorna a string sem caracteres não numéricos.
 *
 * @example
 * // retorna '12345678'
 * getStringAndRemoveCharacters('12345-678')
 *
 * @example
 *  // retorna '100000'
 * getStringAndRemoveCharacters('R$ 1.000,00')
 *
 * @example
 * // retorna '12345678000190'
 * getStringAndRemoveCharacters('12.345.678/0001-90')
 */
function getStringAndRemoveCharacters(value: string) {
  return value.replace(/\D/g, '')
}

/**
 * Formata uma string para o padrão de CEP.
 *
 * Essa função recebe uma string de CEP e a formata para o padrão de CEP brasileiro.
 *
 * @param {string} cep - A string de CEP a ser formatada.
 * @returns {string} Retorna a string de CEP formatada.
 *
 * @example
 * // retorna '12345-678'
 * formatCEP('12345678')
 *
 * **/
function formatCEP(cep?: string) {
  return cep ? cep.replace(/(\d{5})(\d{3})/, '$1-$2') : ''
}

/**
 * Valida um CEP.
 *
 * Essa função recebe uma string de CEP e verifica se ela é válida.
 *
 * @param {string} cep - A string de CEP a ser formatada.
 * @returns {object} Retorna um objeto que possui 2 atributos:
 * - usValid: boolean que indica se o CEP é válido ou não.
 * - message: string que contém a mensagem de erro caso o CEP seja inválido.
 *
 * @example
 * // retorna '12345-678'
 * formatCEP('12345678')
 *
 * **/
function cepValidation(cep: string) {
  const cepOnlyNumbers = getStringAndRemoveCharacters(cep)

  if (cepOnlyNumbers.length !== STRING_LENGTH.CEP)
    return {
      isValid: false,
      message: 'O CEP deve conter 8 dígitos',
    }
  if (!regex.ONLY_NUMBERS.test(cepOnlyNumbers))
    return {
      isValid: false,
      message: 'O CEP deve conter apenas números',
    }

  return {
    isValid: true,
    message: '',
  }
}

export {
  cepValidation,
  formatCEP,
  getStringAndRemoveCharacters,
  regex,
  STRING_LENGTH,
}
