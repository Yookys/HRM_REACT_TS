import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import {defaultHeaders} from '../constants/axiosConst';
import {isEmpty} from './commonUtils';

/**
 * Создаём экземпляр Axios
 */
const axiosInstance: AxiosInstance = axios.create({headers: defaultHeaders});

/**
 * Установка предобработчика ответа
 * @param resp - Ответ
 */
const responseInterceptor = (resp: AxiosResponse): AxiosResponse => {
  const respTmp: AxiosResponse = {...resp};
  if (isEmpty(respTmp.data)) {
    respTmp.data = {};
  }
  return respTmp;
};

/**
 * Установка предобработчика ошибки
 * @param error - Ошибка
 */
const rejectInterceptor = (error: AxiosError): Promise<AxiosError> => {
  const errorTmp: AxiosError = {...error};
  if (isEmpty(errorTmp.response)) {
    errorTmp.response = {
      config: {},
      data: undefined,
      headers: undefined,
      request: undefined,
      status: 500,
      statusText: 'Внутренняя ошибка сервера',
    };
  }
  const status = errorTmp.response!.status || 500;
  const statusText = errorTmp.response!.statusText || 'Внутренняя ошибка сервера';
  if (isEmpty(errorTmp.response!.data) || typeof errorTmp.response!.data === 'string') {
    errorTmp.response!.data = {status, statusText};
  }
  if (isEmpty(errorTmp.response!.data.status)) {
    errorTmp.response!.data.status = status;
  }
  if (isEmpty(errorTmp.response!.data.statusText) && isEmpty(errorTmp.response!.data.status)) {
    errorTmp.response!.data.statusText = statusText;
  }
  return Promise.reject(errorTmp);
};

/**
 * Применяем перехватчики
 */
axiosInstance.interceptors.response.use(responseInterceptor, rejectInterceptor);

export default axiosInstance;
