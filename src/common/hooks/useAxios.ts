import {useEffect, useState} from 'react';
import Axios, {AxiosError, AxiosResponse, Canceler} from 'axios';
import {isEmpty, isFunction} from '../utils/commonUtils';
import {defaultHeaders, defaultReject} from '../constants/axiosConst';
import axiosInstance from '../utils/axiosInstance';
import services from '../constants/configConst';
import config from '../config';
import {IObj} from '../models/commonModel';

/** Общая модель запроса */
export type request = <T>(requestConfig: requestConfig<T>) => void;

/** Общая конфигурация запроса */
export interface requestConfig<T> {
  url: string;
  body?: IObj;
  configuration?: IObj;
  requestKey?: string;
  onSuccess?: (response: AxiosResponse<T>) => void;
  onReject?: (response: AxiosError<T>) => void;
  onFinally?: (response: AxiosResponse<T> | AxiosError<T>) => void;
}

/** Модель прогрессов запросов */
export interface IProgresses {
  [key: string]: number;
}

/** Модель для хука */
export interface IUseAxios {
  getRequestProgress: (requestKey: string) => number;
  getRequest: request;
  postRequest: request;
  putRequest: request;
  patchRequest: request;
  deleteRequest: request;
}

/**
 * Хук для работы с Axios
 */
const useAxios = (): IUseAxios => {
  /** Массив функций для остановки запроса */
  const [cancelFunctions, setCancelFunctions] = useState<Canceler[]>([]);
  /** Объект содержащий прогрессы запросов */
  const [progresses, setProgresses] = useState<IProgresses>({});

  /**
   * Применяем перехватчики
   * И останавливаем запросы при размонтировании
   */
  useEffect(() => {
    return () => {
      cancelFunctions.forEach((cancelF): void => {
        if (isFunction(cancelF)) {
          cancelF();
        }
      });
    };
  }, []); // eslint-disable-line

  /**
   * Подготовка запроса
   * @param config - Конфигурация запроса
   * @param requestKey - Ключ запроса
   */
  const onPrepareRequest = (config: any, requestKey?: string): Object => {
    const configTmp = {
      ...config,
      onUploadProgress: (progressEvent: any) => {
        const totalLength = progressEvent.lengthComputable
          ? progressEvent.total
          : progressEvent.target.getResponseHeader('content-length') ||
            progressEvent.target.getResponseHeader('x-decompressed-content-length');
        if (requestKey) {
          setProgresses((prevState) => ({
            ...prevState,
            [requestKey]: Math.round((progressEvent.loaded * 100) / totalLength),
          }));
        }
      },
    };
    configTmp.cancelToken = new Axios.CancelToken((canceler) =>
      setCancelFunctions((prevState) => [...prevState, canceler])
    );
    if (!isEmpty(configTmp.headers)) {
      configTmp.headers = {
        ...defaultHeaders,
        ...configTmp.headers,
      };
    }
    return configTmp;
  };

  /**
   * Промежуточная обработка успешного запроса
   * @param successFunction - Функция для успешной обработки ответа
   * @param finallyFunction - Функция вызываемая при окончании запроса
   */
  const onSuccessResponse =
    <T>(
      successFunction?: (response: AxiosResponse<T>) => void,
      finallyFunction?: (response: AxiosResponse<T>) => void
    ) =>
    (response: AxiosResponse<T>) => {
      let responseTmp = response;
      if (typeof response.data === 'string') {
        try {
          responseTmp.data = JSON.parse(response.data);
        } catch (e) {
          throw JSON.stringify(defaultReject);
        }
      }
      if (finallyFunction && isFunction(finallyFunction)) {
        finallyFunction(responseTmp);
      }
      if (successFunction && isFunction(successFunction)) {
        successFunction(responseTmp);
      }
    };

  /**
   * Обработчик запроса с ошибкой по-умолчанию
   * @param {Function} rejectFunction - Функция для вызова ошибки
   * @param {Function} finallyFunction - Функция вызываемая при окончании запроса
   */
  const onRejectResponse =
    <T>(rejectFunction?: (response: AxiosError<T>) => void, finallyFunction?: (response: AxiosError<T>) => void) =>
    (reject: AxiosError<T>) => {
      if (!Axios.isCancel(reject)) {
        /**
         * 401 статус - отправляем пользователя на менеджера ЕПА
         * TODO Добавил верные адреса
         */
        if (!isEmpty(reject) && !isEmpty(reject.response) && reject!.response!.status === 401) {
          window.location.href = `${
            config.services[services.epaManager]
          }passport/UI/Login?org=staff&service=default&goto=${config.services[services.epaGateway]}ui/smb/strcc`;
          return;
        }
        let rejectTmp: any = reject;
        if (
          isEmpty(reject) ||
          isEmpty(reject.response) ||
          (typeof reject.response !== 'undefined' && isEmpty(reject.response.data))
        ) {
          if (typeof reject.response!.data !== 'string') {
            rejectTmp = defaultReject;
          } else {
            try {
              rejectTmp.response.data = JSON.parse(reject.response!.data);
            } catch (e) {
              rejectTmp = defaultReject;
            }
          }
        }
        if (finallyFunction && isFunction(finallyFunction)) {
          finallyFunction(rejectTmp);
        }
        if (rejectFunction && isFunction(rejectFunction)) {
          rejectFunction(rejectTmp);
        }
      }
    };

  /**
   * Геттер для прогресса запроса по ключу
   * @param requestKey - Ключ запроса
   */
  const getRequestProgress = (requestKey: string): number => progresses[requestKey];

  /**
   * GET запрос
   * @param requestConfig - Конфигурация запроса
   */
  const getRequest: request = <T>(requestConfig: requestConfig<T>) => {
    axiosInstance
      .get<T>(requestConfig.url, onPrepareRequest(requestConfig.configuration, requestConfig.requestKey))
      .then(onSuccessResponse(requestConfig.onSuccess, requestConfig.onFinally))
      .catch(onRejectResponse(requestConfig.onReject, requestConfig.onFinally));
  };

  /**
   * POST запрос
   * @param requestConfig - Конфигурация запроса
   */
  const postRequest: request = <T>(requestConfig: requestConfig<T>) =>
    axiosInstance
      .post<T>(
        requestConfig.url,
        requestConfig.body,
        onPrepareRequest(requestConfig.configuration, requestConfig.requestKey)
      )
      .then(onSuccessResponse(requestConfig.onSuccess, requestConfig.onFinally))
      .catch(onRejectResponse(requestConfig.onReject, requestConfig.onFinally));

  /**
   * PUT запрос
   * @param requestConfig - Конфигурация запроса
   */
  const putRequest: request = <T>(requestConfig: requestConfig<T>) => {
    axiosInstance
      .put<T>(
        requestConfig.url,
        requestConfig.body,
        onPrepareRequest(requestConfig.configuration, requestConfig.requestKey)
      )
      .then(onSuccessResponse(requestConfig.onSuccess, requestConfig.onFinally))
      .catch(onRejectResponse(requestConfig.onReject, requestConfig.onFinally));
  };

  /**
   * PATCH запрос
   * @param requestConfig - Конфигурация запроса
   */
  const patchRequest: request = <T>(requestConfig: requestConfig<T>) => {
    axiosInstance
      .patch<T>(
        requestConfig.url,
        requestConfig.body,
        onPrepareRequest(requestConfig.configuration, requestConfig.requestKey)
      )
      .then(onSuccessResponse(requestConfig.onSuccess, requestConfig.onFinally))
      .catch(onRejectResponse(requestConfig.onReject, requestConfig.onFinally));
  };

  /**
   * DELETE запрос
   * @param requestConfig - Конфигурация запроса
   */
  const deleteRequest: request = <T>(requestConfig: requestConfig<T>) =>
    axiosInstance
      .delete<T>(requestConfig.url, onPrepareRequest(requestConfig.configuration, requestConfig.requestKey))
      .then(onSuccessResponse(requestConfig.onSuccess, requestConfig.onFinally))
      .catch(onRejectResponse(requestConfig.onReject, requestConfig.onFinally));

  return {
    getRequestProgress,
    getRequest,
    postRequest,
    putRequest,
    patchRequest,
    deleteRequest,
  };
};

export default useAxios;
