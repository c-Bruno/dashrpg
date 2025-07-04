/**
 * Estrutura padrão para o retorno erros e de persistência
 * @returns `201 / 5XX / 4XX`
 * @argument any
 * @default string
 */
export type DefaultResponse<T = string> = {
  message: string;
  details: T;
};

export type ErrorItem<T = Record<string, string>> = {
  field: keyof T;
  message: string;
  value?: string;
};

/**
 * Estrutura para retornos de erros de validação
 * @returns `400 / 422`
 * @argument any
 * @default `Record<string, string>`
 */
export type ValidationResponse<T = Record<string, string>> = {
  type?: string;
  errors: ErrorItem<T>[];
};

/**
 * Estrutura para retornos de erros de autorização, autenticação e permissão
 * status codes: 401 / 403
 * @returns `401 / 403`
 */
export type UnauthorizedResponse = {
  type: string;
};
