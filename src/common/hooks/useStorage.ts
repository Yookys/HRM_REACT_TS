import {useCallback, useEffect, useState} from 'react';
import eventObserver from '../services/EventObserver';
import StorageAdapter from '../utils/StorageAdapter';
import {isEmpty} from '../utils/commonUtils';
import {Storage, StorageEventHandler, StorageEvent, Params} from '../models/storageModel';

export const isActualEvent = <V, K>(
  event: StorageEvent,
  storage: Storage<K, V>,
  key: string
): event is StorageEvent<K, V> => event.key === key && event.storage === storage;

/**
 * Общий хук для локальных хранилищ (localstorage либо sessionStorage)
 * @param {string} key - Ключ значения
 * @param {string} type - Тип хранилища
 * @param {Storage} storage - Хранилище
 * @return {[any, function, function]}
 */
const useStorage = <V, K = any>({key, type, storage}: Params<V>): [V, (data: V) => void, () => void] => {
  /** Значение из хранилища */
  const [localValue, setLocalValue] = useState<V>(storage.getItem(key));

  /**
   * Функция для изменения значения
   */
  const handleSetValue = useCallback(
    (data: V): void => {
      storage.setItem(key, data);
      eventObserver.dispatch(type, {
        storage,
        key,
        value: data,
      });
    },
    [key, storage]
  );

  /**
   * Функция для удаления значения
   */
  const handleRemoveValue = useCallback(() => {
    storage.removeItem(key);
    eventObserver.dispatch(type, {
      storage,
      key,
      value: null,
    });
  }, [key, storage]);

  /**
   * Формируем событие и подписываемся на изменения в хранилище и применяем новое значение при изменении
   */
  useEffect(() => {
    const handleStorageValueChange: StorageEventHandler = (event: StorageEvent): void => {
      if (!isActualEvent<V, K>(event, storage, key)) {
        return;
      }
      setLocalValue(event.value);
    };
    eventObserver.subscribe(type, handleStorageValueChange);
    return () => {
      eventObserver.unsubscribe(type, handleStorageValueChange);
    };
  }, [storage, key]); // eslint-disable-line

  /**
   * Тут обновляем локальное значение в состоянии и отправляем событие, для обновления значения в других экземплярах этого хука
   */
  useEffect(() => {
    /** Проверяем актуальность */
    if (JSON.stringify(storage.getItem(key)) !== JSON.stringify(localValue)) {
      /** Устанавливаем значение */
      setLocalValue(storage.getItem(key));
      if (!isEmpty(storage.getItem(key))) {
        /** Отправляем событие */
        handleSetValue(storage.getItem(key));
      }
    }
  }, [key, storage, handleSetValue]); // eslint-disable-line

  return [localValue, handleSetValue, handleRemoveValue];
};

/**
 * Обёртка для хуков хранилищ
 * @param webStorage - Указанное хранилище (localstorage либо sessionStorage)
 * @param type - Тип хранилища
 */
const createUseWebStorage =
  (webStorage: Storage | null, type: string) =>
  <V>(key: string) =>
    useStorage<V>({
      key,
      type,
      storage: new StorageAdapter(webStorage),
    });

/** Хук для localStorage */
export const useLocalStorage = createUseWebStorage(
  typeof window === 'undefined' ? null : window.localStorage,
  'localStorage'
);

/** Хук для sessionStorage */
export const useSessionStorage = createUseWebStorage(
  typeof window === 'undefined' ? null : window.sessionStorage,
  'sessionStorage'
);
