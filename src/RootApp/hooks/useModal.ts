import {Attributes, FunctionComponentElement} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from '../../common/utils/commonUtils';
import ModalStackThunk from '../redux/thunks/modalStackThunk';
import {IObj} from '../../common/models/commonModel';
import {IRootState} from '../models/reducerModel';
import {IModalStore} from '../redux/reducers/modalStackReducer';

export interface IUseModal {
  modalStack: IModalStore[];
  modal: IModalStore | null;
  props: Attributes | null;
  component: FunctionComponentElement<any> | null;
  openModal: (
    componentModal: FunctionComponentElement<any>,
    propsModal?: IObj,
    closetWithClickOnWrapper?: boolean
  ) => Function;
  editPropsModal: (nextProps: IObj, key?: number) => Function;
  closeLastModal: () => Function;
  closeAllModals: () => Function;
  getPropModalByKey: (key: number) => Attributes;
}

/**
 * Хук для работы с модальными окнами
 */
const useModal = (): IUseModal => {
  const dispatch = useDispatch();
  const modalStack: IModalStore[] = useSelector((state: IRootState) => state.modalStack);
  const modal: IModalStore | null = isEmpty(modalStack) ? null : modalStack[modalStack.length - 1];
  const props: Attributes | null = isEmpty(modal) ? null : modal!.props;
  const component: FunctionComponentElement<any> | null = isEmpty(modal) ? null : modal!.component;

  /**
   * Открытие модального окна
   * @param id - ID модального окна
   * @param componentModal - Компонент
   * @param propsModal - Реквизит модального окна
   * @param closetWithClickOnWrapper - Закрытие модального окна по клику на подложку
   */
  const openModal = (
    componentModal: FunctionComponentElement<any>,
    propsModal: IObj = {},
    closetWithClickOnWrapper = false
  ) => dispatch(ModalStackThunk.openModal({component: componentModal, props: propsModal, closetWithClickOnWrapper}));

  /**
   * Изменение модельного окна
   * @param nextProps - Новый реквизит
   * @param key - Порядковый номер
   */
  const editPropsModal = (nextProps: IObj, key: number = modalStack.length - 1) =>
    dispatch(ModalStackThunk.editPropsModal(nextProps, key));

  /**
   * Закрытие последнего модального окна
   */
  const closeLastModal = () => dispatch(ModalStackThunk.closeModal());

  /**
   * Закрытие всех модальных окон
   */
  const closeAllModals = () => dispatch(ModalStackThunk.closeAllModal());

  /**
   * Геттер пропсов модального окна по ключу
   * @param key - Порядковый номер
   */
  const getPropModalByKey = (key: number): IObj => <IObj>modalStack[key].props;

  return {
    modalStack,
    modal,
    props,
    component,
    openModal,
    editPropsModal,
    closeLastModal,
    closeAllModals,
    getPropModalByKey,
  };
};

export default useModal;
