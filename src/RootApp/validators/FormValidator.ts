import {EFormFields, IFormErrors, IFormValues} from '../models/FormModel';
import {IObj} from '../../common/models/commonModel';
import {isEmpty} from '../../common/utils/commonUtils';

/**
 * Валидатор формы
 * @param fields - Валидируемые поля
 */
const testFormValidator: (fields: IFormValues) => IFormErrors | IObj = (fields) => {
  const errors: IFormErrors | IObj = {};
  if (isEmpty(fields[EFormFields.position])) {
    errors.position = 'Укажите позицию';
  }
  if (isEmpty(fields[EFormFields.level])) {
    errors.level = 'Укажите уровень';
  }
  return errors;
};

export default testFormValidator;
