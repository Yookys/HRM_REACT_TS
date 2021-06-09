/**
 * Модель тела запроса на отправку вакансии
 */
export interface RequestHrmModel {
  author: string;
  url: string;
  title: string;
  position: string;
  level: string;
  assignee: string;
  body: string;
  body_html: any;
}
