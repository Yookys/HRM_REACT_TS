// eslint-disable-next-line
export interface Storage<K = any, V = any> {
  getItem(key: string): V;
  setItem(key: string, value: V): void;
  removeItem(key: string): void;
}

export type Maybe<V> = V | null;

export interface StorageEvent<K = unknown, V = unknown> {
  key: K;
  value: V;
  storage: Storage<V, K>;
}

export type StorageEventHandler = (event: StorageEvent) => void;

export interface Params<V> {
  key: string;
  type: string;
  storage: Storage<V>;
}
