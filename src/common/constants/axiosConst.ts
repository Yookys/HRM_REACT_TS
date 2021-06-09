import {IObj} from '../models/commonModel';

/**
 * Заголовки по-умолчанию
 */
export const defaultHeaders: IObj = {
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  Pragma: 'no-cache',
};

/**
 * Ответ с ошибкой по-умолчанию
 */
export const defaultReject: IObj = {
  response: {
    status: 500,
    statusText: 'Internal server error',
    data: {
      status: 500,
      statusText: 'Internal server error',
    },
  },
};
