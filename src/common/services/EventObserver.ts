import {isEmpty} from '../utils/commonUtils';
import {IObj} from '../models/commonModel';
import {StorageEventHandler, StorageEvent} from '../models/storageModel';

/**
 * Класс-слушатель событий
 * Собирает в себе всех слушателей событий и вызывает колл-бэк функции при совершении события
 */
class EventObserver {
  /** Слушатели */
  handlers: IObj = {};

  /**
   * Подписывание на события
   * @param event - Событие
   * @param handler - Слушатель
   * @param handlerKey - Ключ события
   */
  subscribe(event: string, handler: StorageEventHandler, handlerKey: string | null = null): void {
    if (isEmpty(this.handlers[event])) {
      this.handlers[event] = new Map();
    }
    this.handlers[event].set(!handlerKey ? handler : handlerKey, handler);
  }

  /**
   * Отписывание от событий
   * @param event - Событие
   * @param handler - Слушатель
   * @param handlerKey - Ключ события
   */
  unsubscribe(event: string, handler: StorageEventHandler, handlerKey: string | null = null): void {
    if (!isEmpty(this.handlers[event])) {
      if (isEmpty(handlerKey)) {
        this.handlers[event].delete(handler);
      } else {
        this.handlers[event].delete(handlerKey);
      }
    }
  }

  /**
   * Отправка событий
   * @param event - Событие
   * @param data - Данные
   */
  dispatch(event: string, data: StorageEvent<any, any>): void {
    if (!isEmpty(this.handlers[event])) {
      this.handlers[event].forEach((handler: StorageEventHandler) => {
        handler(data);
      });
    }
  }
}

const eventObserver = new EventObserver();
export default eventObserver;
