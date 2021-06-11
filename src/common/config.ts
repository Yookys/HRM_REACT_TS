import services from './constants/configConst';
import {isEmpty} from './utils/commonUtils';
import {IObj} from './models/commonModel';

/**
 * Модель конфигурации
 */
export interface IConfig {
  [key: string]: IServiceConfig;
}

/**
 * Модель элемента конфигурации
 */
interface IServiceConfig {
  WS: boolean;
  PATH: string;
  SCHEMA?: string;
  HOST?: string;
  PORT?: string;
}

/**
 * Общий класс, содержащий и формирующий конфигурацию
 */
class Config {
  formData: IObj = {};

  services: IObj = {};

  wsServices: IObj = {};

  /**
   * Конструктор
   */
  constructor() {
    Object.values(services).forEach((service: string) => {
      this.services[service] = '';
    });
    this.init = this.init.bind(this);
  }

  /**
   * Инициализация конфига
   * @param {Object} configuration - Результат запроса конфигурации
   */
  init(configuration: IObj) {
    this.formData = configuration.data.FORM_DATA;
    const config: IConfig = configuration.data.HOSTS;
    /** Проверка на пустоту конфига */
    if (isEmpty(config)) {
      throw new Error(`Config error (${process.env.REACT_APP_CONFIG}) - is empty.`);
    }
    /** Проверка на корректный JSON */
    try {
      JSON.stringify(config);
    } catch (exception) {
      throw new Error(`Config error (${process.env.REACT_APP_CONFIG}) - parse error.`);
    }
    /** Проверка на наличие обязательных сервисов */
    Object.values(services).forEach((requiredSupportServiceName: string) => {
      if (
        isEmpty(
          Object.keys(config).find((configServiceName: string) => configServiceName === requiredSupportServiceName)
        )
      ) {
        throw new Error('Required configurations not found');
      }
    });
    /** Конфигурирование URL сервисов */
    Object.keys(config).forEach((serviceName: string) => {
      /** Хост */
      this.services[serviceName] = !isEmpty(config[serviceName].HOST)
        ? `${this.services[serviceName]}${config[serviceName].HOST}`
        : `${this.services[serviceName]}${window.location.hostname}`;
      /** Порт */
      if (config[serviceName].PORT !== '80') {
        this.services[serviceName] = !isEmpty(config[serviceName].PORT)
          ? `${this.services[serviceName]}:${config[serviceName].PORT}`
          : `${this.services[serviceName]}:${window.location.port}`;
      }
      /** Путь */
      if (isEmpty(config[serviceName].PATH)) {
        throw new Error(
          `Config error (${process.env.REACT_APP_CONFIG}) - the service (${serviceName}) does not have the "PATH" parameter.`
        );
      } else this.services[serviceName] = `${this.services[serviceName]}${config[serviceName].PATH}`;
      /** Протокол WS */
      if (config[serviceName].WS) {
        this.wsServices[serviceName] = `ws://${this.services[serviceName]}`;
      }
      /** Схема */
      this.services[serviceName] = !isEmpty(config[serviceName].SCHEMA)
        ? `${config[serviceName].SCHEMA}://${this.services[serviceName]}`
        : `${window.location.protocol}//${this.services[serviceName]}`;
    });
  }
}

const wsUtils = new Config();
export default wsUtils;
