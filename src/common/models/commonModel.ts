/**
 * Общая модель для объектов
 */
export interface IObj {
  [key: string]: any;
}

export namespace Empty {
  export type String = '';
  export type Object = Record<string, never>;
  export type Array = any[];
  export type Any = any;
  export type Null = null;
  export type Undefined = undefined;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Empty = Empty.Array | Empty.Object | Empty.String | Empty.Null | Empty.Undefined | Empty.Any;
