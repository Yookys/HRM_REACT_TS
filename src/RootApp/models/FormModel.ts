/** Перечень полей в форме */
export enum EFormFields {
  position = 'position',
  level = 'level',
  expert = 'expert',
  description = 'description',
}

/** Интерфейс значений формы */
export interface IFormValues {
  [EFormFields.position]?: string;
  [EFormFields.level]?: string;
  [EFormFields.expert]?: string;
  [EFormFields.description]?: string;
}

/** Интерфейс ошибок в форме */
export interface IFormErrors {
  [EFormFields.position]?: string;
  [EFormFields.level]?: string;
  [EFormFields.expert]?: string;
  [EFormFields.description]?: string;
}
