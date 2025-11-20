import { toast } from 'sonner';
import { Env } from '@/config/environtment';

// Types
export interface CustomError {
  message: string;
  code?: string;
  details?: any;
}

export interface ResponseApi<T = any> {
  data?: T;
  message?: string;
  success: boolean;
  error?: CustomError;
}

export class HttpErrorResponse extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: CustomError
  ) {
    super(message);
    this.name = 'HttpErrorResponse';
  }
}

interface FetchOptions extends RequestInit {
  toast?: boolean;
  responseType?: 'json' | 'blob';
  fileName?: string;
  params?: Record<string, string | number | boolean | undefined | null>;
  next?: NextFetchRequestConfig;
}

export interface IHttpFactory {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  fetchOptions?: FetchOptions;
  body?: any;
  toast?: boolean;
}

// Cookie helper function
export async function getServerCookies(): Promise<string> {
  if (typeof window !== 'undefined') return '';

  try {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    return cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');
  } catch (error) {
    console.error('Failed to access cookies:', error);
    return '';
  }
}

// URL builder function
function buildUrlWithParams(
  url: string,
  params?: Record<string, string | number | boolean | undefined | null>,
): string {
  if (!params) return url;
  
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null,
    ),
  );
  
  if (Object.keys(filteredParams).length === 0) return url;
  
  const queryString = new URLSearchParams(
    filteredParams as Record<string, string>,
  ).toString();
  return `${url}?${queryString}`;
}

class HttpFactory {
  private readonly DEFAULT_CACHE_DURATION = 5000; // 5 seconds default cache

  private handleError(error: Error | HttpErrorResponse, options?: FetchOptions) {
    const status = error instanceof HttpErrorResponse ? error.statusCode : 500;
    const message = error.message || 'An unexpected error occurred.';

    const statusMessages: Record<number, string> = {
      400: 'Bad Request. Please check your input.',
      401: 'Unauthorized. Authentication is required.',
      403: 'Invalid Credentials',
      404: 'Resource not found. Please check the URL.',
      405: 'Method Not Allowed. The request method is not supported for the requested resource.',
      408: 'Request Timeout. The server timed out waiting for the request.',
      409: 'Conflict. The request could not be completed due to a conflict with the current state of the resource.',
      410: 'Gone. The requested resource is no longer available and will not be available again.',
      413: 'Payload Too Large. The request entity is larger than the server is willing or able to process.',
      415: 'Unsupported Media Type. The request entity has a media type which the server or resource does not support.',
      422: 'Unprocessable Entity. The request was well-formed but was unable to be followed due to semantic errors.',
      429: 'Too Many Requests. The user has sent too many requests in a given amount of time.',
      500: 'Internal Server Error. Please try again later.',
      501: 'Not Implemented. The server does not support the functionality required to fulfill the request.',
      502: 'Bad Gateway. The server is down or being upgraded.',
      503: 'Service Unavailable. Please try again later.',
      504: 'Gateway Timeout. The server took too long to respond.',
      507: 'Insufficient Storage. The server is unable to store the representation needed to complete the request.',
      511: 'Network Authentication Required. The client needs to authenticate to gain network access.',
    };

    const errorMessage = statusMessages[status] || message;
    const { toast: shouldToast = false } = options || {};

    if (shouldToast && typeof window !== 'undefined') {
      toast.error(errorMessage, {
        description: `ERROR CODE ${status}`,
      });
    }

    throw new HttpErrorResponse(status, errorMessage);
  }

  private async handleBlobResponse(response: Response, fileName?: string): Promise<void> {
    if (typeof window === 'undefined') {
      throw new HttpErrorResponse(500, 'Blob download not supported on server');
    }

    try {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      let downloadFileName = fileName || 'download';
      const contentDisposition = response.headers.get('Content-Disposition');

      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (fileNameMatch && fileNameMatch[1]) {
          downloadFileName = fileNameMatch[1];
        }
      }

      const link = document.createElement('a');
      link.href = url;
      link.download = downloadFileName;
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error handling blob response:', error);
      throw new HttpErrorResponse(500, 'Failed to process file download');
    }
  }

  private async fetchApi<T>(
    url: string,
    options: FetchOptions = {}
  ): Promise<ResponseApi<T>> {
    const {
      method = 'GET',
      headers = {} as any,
      body,
      params,
      cache = 'no-store',
      next,
      responseType = 'json',
      toast: shouldToast = false,
      fileName,
      ...fetchOptions
    } = options;

    // Get cookies from the request when running on server
    let cookieHeader = headers['Cookie'] as string | undefined;
    if (typeof window === 'undefined' && !cookieHeader) {
      cookieHeader = await getServerCookies();
    }

    // Build full URL
    const fullUrl = buildUrlWithParams(
      url.startsWith('http') ? url : `${Env.NEXT_PUBLIC_APP_URL}${url}`,
      params
    );

    try {
      const response = await fetch(fullUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...headers,
          ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
        credentials: 'include',
        cache,
        next,
        ...fetchOptions,
      });

      if (!response.ok) {
        let errorMessage = response.statusText;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // Use default error message if JSON parsing fails
        }

        if (shouldToast && typeof window !== 'undefined') {
          toast.error(errorMessage);
        }

        throw new HttpErrorResponse(response.status, errorMessage);
      }

      // Handle blob response
      if (responseType === 'blob') {
        await this.handleBlobResponse(response, fileName);
        return { success: true, message: 'File download completed' } as ResponseApi<T>;
      }

      // Handle JSON response
      const data = await response.json();

      return data;

    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        this.handleError(error, options);
      }
      this.handleError(
        new HttpErrorResponse(0, 'Network error occurred'),
        options
      );
      throw error;
    }
  }

  async call<T>({
    method,
    url,
    fetchOptions,
    body,
  }: IHttpFactory): Promise<ResponseApi<T>> {
    return this.fetchApi<T>(url, {
      method,
      body,
      ...fetchOptions,
    });
  }

  async get<T>(url: string, options?: FetchOptions): Promise<ResponseApi<T>> {
    return this.call({
      method: 'GET',
      url,
      fetchOptions: options,
    });
  }

  async post<T>(
    url: string,
    data: any,
    options?: FetchOptions
  ): Promise<ResponseApi<T>> {
    return this.call({
      method: 'POST',
      url,
      fetchOptions: options,
      body: data,
    });
  }

  async put<T>(
    url: string,
    data: any,
    options?: FetchOptions
  ): Promise<ResponseApi<T>> {
    return this.call({
      method: 'PUT',
      url,
      fetchOptions: options,
      body: data,
    });
  }

  async patch<T>(
    url: string,
    data: any,
    options?: FetchOptions
  ): Promise<ResponseApi<T>> {
    return this.call({
      method: 'PATCH',
      url,
      fetchOptions: options,
      body: data,
    });
  }

  async delete<T>(
    url: string,
    options?: FetchOptions
  ): Promise<ResponseApi<T>> {
    return this.call({
      method: 'DELETE',
      url,
      fetchOptions: options,
    });
  }
}

export const http = new HttpFactory();

export const api = {
  get: http.get.bind(http),
  post: http.post.bind(http),
  put: http.put.bind(http),
  patch: http.patch.bind(http),
  delete: http.delete.bind(http),
  call: http.call.bind(http),
};

export default HttpFactory;