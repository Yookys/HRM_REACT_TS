/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
    REACT_APP_CONFIG: string;
    REACT_APP_BASEPATH: string;
    REACT_APP_VERSION: string;
    REACT_APP_PROXY_HOST: string;
    REACT_APP_PROXY_PATH: string;
  }
}
