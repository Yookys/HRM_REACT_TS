import dayjs from 'dayjs';
import {Validation} from '../models/validationModel';
import {isEmpty} from './commonUtils';

/**
 * Влидатор строк
 */
export const StringValidator: Validation.IStringValidator = {
  isEmpty: (string) => isEmpty(string),
  isAcceptableRegexp: (string, lettersRegexp) => lettersRegexp.test(string),
  isLength: (string, length) => string.length === length,
  isMaxLengthLimit: (string, maxLength) => string.length <= maxLength,
  isMinLengthLimit: (string, minLength) => string.length >= minLength,
  isMinMaxLengthLimit: (string, maxLength, minLength) => string.length >= minLength && string.length <= maxLength,
};

/**
 * Влидатор чисел
 */
export const NumberValidator: Validation.INumberValidator = {
  isEmpty: (number) => isEmpty(number),
  isNan: (number) => Number.isNaN(number),
  isEquals: (number, target) => number === target,
  isMaxLimit: (number, max) => number <= max,
  isMinLimit: (number, min) => number >= min,
  isMinMaxLimit: (number, max, min) => number >= min && number <= max,
};

/**
 * Влидатор даты
 */
export const DateValidator: Validation.IDateValidator = {
  isValid: (date) => dayjs(date).isValid(),
  isBefore: (date, type) => dayjs().isBefore(date, type),
  isEquals: (date, targetDate) => dayjs(date).isSame(targetDate),
  isAfter: (date, type) => dayjs().isAfter(date, type),
};
