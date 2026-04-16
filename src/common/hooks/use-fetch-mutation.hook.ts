import { useState } from 'react';

import { DefaultResponse, UnauthorizedResponse, ValidationResponse } from 'common/types';

import useError from './use-error.hook';

type ApiResponse<T = any> = {
  data: T;
  status: number;
  statusText: string;
};

type FetchError = Error & {
  response?: {
    data: any;
    status: number;
  };
};

export type ErrorsResponse<T = unknown> = {
  error: FetchError | Error;
  validationError?: DefaultResponse<ValidationResponse<T>>;
  unauthorizedError?: DefaultResponse<UnauthorizedResponse>;
};

export type FetchMutationOptions<P = unknown, R = unknown> = {
  onSuccess?: (data: R, response?: ApiResponse<R>) => void;
  onError?: (params: ErrorsResponse<P>) => void;
};

const useFetchMutation = <P = unknown, R = unknown>(
  fetcher: (args?: P) => Promise<ApiResponse<R>>,
  options?: FetchMutationOptions<P, R>,
) => {
  const { handleError } = useError<P>();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<R>();
  const [errors, setErrors] = useState<ErrorsResponse<P>>();

  const trigger = async (params: P) => {
    try {
      setIsLoading(true);
      const response = await fetcher(params);

      setData(response.data);
      setErrors(undefined);

      options?.onSuccess && options.onSuccess(response.data, response);
    } catch (err) {
      setData(undefined);

      const { error, errors } = handleError(err);
      setErrors({ error, unauthorizedError: errors.unauthorizedError, validationError: errors.validationError });

      // return custom erros
      options?.onError &&
        options.onError({
          error,
          unauthorizedError: errors.unauthorizedError,
          validationError: errors.validationError,
        });
    } finally {
      setIsLoading(false);
    }
  };

  return { data, errors, trigger, isLoading };
};

export default useFetchMutation;
