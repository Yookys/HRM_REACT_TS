import {ConfigType, OpUnitType} from 'dayjs';

/**
 * Пространство имён для моделей валидаторов
 */
export namespace Validation {
  /** Проверка строк */
  export interface IStringValidator {
    /** Проверка на пустоту */
    isEmpty(s: string): boolean;
    /** Проверка на Regexp */
    isAcceptableRegexp(s: string, lettersRegexp: RegExp): boolean;
    /** Проверка на установленную длину */
    isLength(string: string, length: number): boolean;
    /** Проверка на максимальную длину */
    isMaxLengthLimit(string: string, maxLength: number): boolean;
    /** Проверка на минимальную длину */
    isMinLengthLimit(string: string, minLength: number): boolean;
    /** Проверка на максимальную и минимальную длину */
    isMinMaxLengthLimit(string: string, maxLength: number, minLength: number): boolean;
  }

  /** Проверка чисел */
  export interface INumberValidator {
    /** Проверка на пустоту */
    isEmpty(number: number): boolean;
    /** Проверка на NaN */
    isNan(number: number): boolean;
    /** Проверка на соответствие */
    isEquals(number: number, target: number): boolean;
    /** Проверка на максимальное значение */
    isMaxLimit(number: number, max: number): boolean;
    /** Проверка на минимальное значение */
    isMinLimit(number: number, min: number): boolean;
    /** Проверка на максимальное и минимальное значение */
    isMinMaxLimit(number: number, max: number, min: number): boolean;
  }

  /** Проверка чисел */
  export interface IDateValidator {
    /** Проверка на соответствие */
    isValid(date: ConfigType): boolean;
    /** Проверка на соответствие */
    isBefore(date: ConfigType, type?: OpUnitType): boolean;
    /** Проверка на соответствие */
    isEquals(date: ConfigType, targetDate: ConfigType): boolean;
    /** Проверка на соответствие */
    isAfter(date: ConfigType, type?: OpUnitType): boolean;
  }
}
