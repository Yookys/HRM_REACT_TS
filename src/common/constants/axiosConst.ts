import {IObj} from '../models/commonModel';

/**
 * Заголовки по-умолчанию
 */
export const defaultHeaders: IObj = {
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  Pragma: 'no-cache',
  // TODO Выяснить, будет ли актуален заголовок
  'X-TYK-API-KEY': process.env.REACT_APP_TYK_API_KEY,
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
