import 'antd/dist/antd.css';
import './common/styles/main.scss';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import initApp from './common/utils/initAppUtils';
import RootApp from './RootApp/RootApp';

initApp(
  <React.StrictMode>
    <BrowserRouter basename={process.env.REACT_APP_BASEPATH}>
      <RootApp />
    </BrowserRouter>
  </React.StrictMode>
);
