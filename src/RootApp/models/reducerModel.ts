import {IModalStore} from '../redux/reducers/modalStackReducer';
import {IGlobalErrorStore} from '../redux/reducers/globalErrorReducer';

/**
 * Модель Стора
 */
export interface IRootState {
  modalStack: IModalStore[];
  globalError: IGlobalErrorStore;
}
