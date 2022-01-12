/** Перечень полей в форме */
export enum EFormFields {
  position = 'position',
  level = 'level',
  expert = 'expert',
  description = 'description',
  sendInvite = 'sendInvite'
}

/** Интерфейс значений формы */
export interface IFormValues {
  [EFormFields.position]?: string;
  [EFormFields.level]?: string;
  [EFormFields.expert]?: string;
  [EFormFields.description]?: string;
  [EFormFields.sendInvite]?: boolean;
}

/** Интерфейс ошибок в форме */
export interface IFormErrors {
  [EFormFields.position]?: string;
  [EFormFields.level]?: string;
  [EFormFields.expert]?: string;
  [EFormFields.description]?: string;
  [EFormFields.sendInvite]?: string;
}
