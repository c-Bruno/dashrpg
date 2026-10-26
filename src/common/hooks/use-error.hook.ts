import { DefaultResponse, UnauthorizedResponse, ValidationResponse } from 'common/types';

type FetchError = Error & {
  response?: {
    data: any;
    status: number;
    statusText: string;
  };
};

const useError = <T = string>() => {
  const DEFAULT_ERROR_MESSAGE = 'Ocorreu um erro desconhecido, tente novamente mais tarde.';

  type IHandleError = (
    error: FetchError | Error,
    customMessage?: string,
  ) => {
    message: string;
    error: FetchError | Error;
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

    const fetchError = error as FetchError;
    if (fetchError.response) {
      const data = fetchError.response.data;
      const status = fetchError.response.status;

      // validation erros
      if (status === 400 || status === 422) {
        validationError = data as DefaultResponse<ValidationResponse<T>>;
      }

      // unauthorized errors
      if (status === 401 || status === 403) {
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
