import {useDispatch, useSelector} from 'react-redux';
import errorThunk from '../redux/thunks/globalErrorThunk';
import {isEmpty} from '../../common/utils/commonUtils';
import {IRootState} from '../models/reducerModel';
import {IGlobalErrorStore} from '../redux/reducers/globalErrorReducer';

export interface IUseGlobalError {
  globalError: IGlobalErrorStore;
  setGlobalError: (nextError: number) => void;
  clearGlobalError: () => void;
  isHaveGlobalError: () => void;
}

/**
 * Хук для работы с глобальными ошибками
 */
const useGlobalError = (): IUseGlobalError => {
  const dispatch = useDispatch();
  const globalError = useSelector((state: IRootState) => state.globalError);

  /**
   * Установка глобальной ошибки
   * @param nextError - Ошибка
   */
  const setGlobalError = (nextError: number) => dispatch(errorThunk.setGlobalError(nextError));

  /**
   * Очистка глобальной ошибки
   * @return {function}
   */
  const clearGlobalError = () => dispatch(errorThunk.clearGlobalError());

  /**
   * Проверка на наличие глобальной ошибки
   */
  const isHaveGlobalError = (): boolean => !isEmpty(globalError.globalError);

  return {
    globalError,
    setGlobalError,
    clearGlobalError,
    isHaveGlobalError,
  };
};

export default useGlobalError;
