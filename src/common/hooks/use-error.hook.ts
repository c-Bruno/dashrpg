import axios, { AxiosError } from 'axios';
import { DefaultResponse, UnauthorizedResponse, ValidationResponse } from 'common/types';
import httpStatus from 'http-status';

const useError = <T = string>() => {
  const DEFAULT_ERROR_MESSAGE = 'Ocorreu um erro desconhecido, tente novamente mais tarde.';

  type IHandleError = (
    error: AxiosError | Error,
    customMessage?: string,
  ) => {
    message: string;
    error: AxiosError | Error;
    errors: {
      validationError?: DefaultResponse<ValidationResponse<T>>;
      unauthorizedError?: DefaultResponse<UnauthorizedResponse>;
    };
  };

  const handleError: IHandleError = (error, customMessage) => {
    let message = DEFAULT_ERROR_MESSAGE;

    let validationError: DefaultResponse<ValidationResponse<T>> | undefined;
    let unauthorizedError: DefaultResponse<UnauthorizedResponse> | undefined;

    console.error(error);

    if (axios.isAxiosError(error)) {
      const data = error.response?.data;
      const status = error.response?.status;

      // validation erros
      if (status === httpStatus.BAD_REQUEST || status === httpStatus.UNPROCESSABLE_ENTITY) {
        validationError = data as DefaultResponse<ValidationResponse<T>>;
      }

      // unauthorized errors
      if (status === httpStatus.UNAUTHORIZED || status === httpStatus.FORBIDDEN) {
        unauthorizedError = data as DefaultResponse<UnauthorizedResponse>;
      }
    }

    if (customMessage) {
      message = customMessage;
    }

    return { message, error, errors: { validationError, unauthorizedError } };
  };

  const validationField = <S = T>(fieldName: keyof S, errors?: DefaultResponse<ValidationResponse<S>>) => {
    if (!errors) return { error: undefined, supportText: undefined };

    const fieldError = errors.details.errors.find((error) => error.field === fieldName);
    if (!fieldError) return { error: undefined, supportText: undefined };

    return {
      error: true,
      supportText: fieldError.message,
    };
  };

  return { handleError, validationField };
};

export default useError;
