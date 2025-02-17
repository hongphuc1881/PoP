import axios, { AxiosError, HttpStatusCode } from 'axios';

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}

//handle error 422: check lỗi đăng ký khi email đã tồn tại
export function isAxiosUnprocessableEntityError<FormError>(
  error: unknown
): error is AxiosError<FormError> {
  return (
    isAxiosError(error) &&
    error.response?.status == HttpStatusCode.UnprocessableEntity
  );
}
