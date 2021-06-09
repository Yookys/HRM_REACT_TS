import {useState} from 'react';
import {isEmpty} from '../utils/commonUtils';
import {IObj} from '../models/commonModel';

export interface INextFields {
  [key: string]: {
    value: any;
    error?: string;
  };
}

export interface IUseForm<T extends IObj, K extends IObj> {
  fields: T | IObj;
  errors: K | IObj;
  isSubmit: boolean;
  setIsSubmit: (value: boolean) => void;
  setField: (field: string, value: any) => void;
  setFields: (nextFields: INextFields) => void;
  clearForm: () => void;
  clearErrors: () => void;
  setErrors: (errors: IObj) => void;
  isValidForm: () => boolean;
}

/**
 * Хук формы
 * @param {Function} validator - Валидатор формы
 * @param {Object} initFields - Начальное состояние формы
 * @param {Object} initErrors - Начальное состояние ошибок
 */
const useForm = <T extends IObj, K extends IObj>(
  validator: (fields: T) => K | {},
  initFields: T,
  initErrors: K
): IUseForm<T, K> => {
  const [fields, setFieldsState] = useState<T>(initFields);
  const [errorFields, setErrorFields] = useState<K | IObj>(!isEmpty(initErrors) ? initErrors : {});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  /**
   * Установка значения
   * @param field - Название
   * @param value - Значение
   */
  const setField = (field: string, value: any): void => {
    if (!isSubmit) {
      setErrorFields((prevState) => ({...prevState, [field]: undefined}));
      setFieldsState((prevState) => ({...prevState, [field]: value}));
    }
  };

  /**
   * Установка значений и ошибок
   * @param nextFields - Значения и ошибки полей: {key: {value, error}}
   */
  const setFields = (nextFields: INextFields): void => {
    if (!isSubmit) {
      const fieldsTmp: T = {...fields};
      const errorsTmp: K | IObj = {...errorFields};
      Object.keys(nextFields).forEach((item) => {
        // @ts-ignore
        fieldsTmp[item] = nextFields[item].value;
        // @ts-ignore
        errorsTmp[item] = isEmpty(nextFields[item].error) ? undefined : nextFields[item].error;
      });
      setFieldsState((prevState) => ({...prevState, ...fieldsTmp}));
      setErrorFields((prevState) => ({...prevState, ...errorsTmp}));
    }
  };

  /**
   * Очистка формы
   */
  const clearForm = (): void => {
    if (!isSubmit) {
      setFields({});
      setErrorFields({});
    }
  };

  /**
   * Очистка формы
   */
  const clearErrors = (): void => {
    if (!isSubmit) {
      setErrorFields({});
    }
  };

  /**
   * Установка ошибок
   * @param errors - Объект с ошибками
   */
  const setErrors = (errors: IObj = {}): void => {
    setIsSubmit(false);
    setErrorFields({...errorFields, ...errors});
  };

  /**
   * Валидация и вызов функции отправки
   */
  const isValidForm = (): boolean => {
    const validateResult: K | {} = validator(fields);
    if (isEmpty(validateResult)) {
      setErrorFields({});
      return true;
    }
    setErrors(validateResult);
    return false;
  };

  return {
    fields,
    errors: errorFields,
    isSubmit,
    setIsSubmit,
    setField,
    setFields,
    clearForm,
    clearErrors,
    setErrors,
    isValidForm,
  };
};

export default useForm;
