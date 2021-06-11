import {isEmpty} from './commonUtils';
import {Maybe, Storage} from '../models/storageModel';

/**
 * Класс-обёртка для работы с локальными хранилищами
 * Позволяет хранить в localStorage и sessionStorage серриализованный JSON
 */
class StorageAdapter implements Storage<string> {
  storage: Storage | null;

  /**
   * Конструктор
   * @param storage - Хранилище (localStorage или sessionStorage)
   */
  constructor(storage: Storage | null) {
    this.storage = storage;
  }

  /**
   * Получение значения
   * @param key - Ключ значения
   */
  getItem<V>(key: string): Maybe<V> {
    if (this.storage === undefined || this.storage === null || isEmpty(this.storage.getItem(key))) {
      return null;
    }
    let value;
    try {
      value = JSON.parse(this.storage.getItem(key));
    } catch (exception) {
      value = this.storage.getItem(key);
    }
    return value;
  }

  /**
   * Установка значения
   * @param key - Ключ значения
   * @param value - Значение
   */
  setItem<V>(key: string, value: V) {
    if (this.storage !== undefined && this.storage !== null) {
      this.storage.setItem(key, JSON.stringify(value));
    }
  }

  /**
   * Удаление значения
   * @param key - Ключ значения
   */
  removeItem(key: string) {
    if (this.storage !== undefined && this.storage !== null) {
      this.storage.removeItem(key);
    }
  }
}

export default StorageAdapter;
