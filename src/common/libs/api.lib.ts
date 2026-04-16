/**
 * Fetch-based API client with axios-like interface.
 * Compatible with existing codebase while using native fetch.
 */

type RequestConfig = {
  headers?: Record<string, string>;
  params?: Record<string, string>;
};

type ApiResponse<T = any> = {
  data: T;
  status: number;
  statusText: string;
};

class FetchError extends Error {
  response?: {
    data: any;
    status: number;
    statusText: string;
  };

  constructor(message: string, status?: number, data?: any, statusText?: string) {
    super(message);
    this.name = 'FetchError';
    if (status) {
      this.response = {
        data,
        status,
        statusText: statusText || '',
      };
    }
  }
}

const createApiClient = (baseURL: string) => {
  const request = async <T = any>(
    method: string,
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> => {
    // Build relative path (browser handles baseURL automatically)
    let path = `${baseURL}${url.startsWith('/') ? url : `/${url}`}`;

    if (config?.params) {
      const params = new URLSearchParams(config.params);
      path += `?${params.toString()}`;
    }

    const response = await fetch(path, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    const responseData = await response.json().catch(() => null);

    const apiResponse: ApiResponse<T> = {
      data: responseData,
      status: response.status,
      statusText: response.statusText,
    };

    if (!response.ok) {
      throw new FetchError(
        `Request failed with status ${response.status}`,
        response.status,
        responseData,
        response.statusText,
      );
    }

    return apiResponse;
  };

  return {
    get: <T = any>(url: string, config?: RequestConfig) => request<T>('GET', url, undefined, config),
    post: <T = any>(url: string, data?: any, config?: RequestConfig) => request<T>('POST', url, data, config),
    put: <T = any>(url: string, data?: any, config?: RequestConfig) => request<T>('PUT', url, data, config),
    delete: <T = any>(url: string, config?: RequestConfig) => request<T>('DELETE', url, undefined, config),
    patch: <T = any>(url: string, data?: any, config?: RequestConfig) => request<T>('PATCH', url, data, config),
  };
};

export const api = createApiClient('/api');
export default api;
