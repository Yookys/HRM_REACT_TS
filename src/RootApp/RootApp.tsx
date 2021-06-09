import React from 'react';
import ModalStack from './components/ModalStack/ModalStack';
import RootLayout from './layouts/RootLayout';
import RootWrapper from './components/RootWrapper/RootWrapper';

/**
 * Корневое приложение
 */
const RootApp = (): JSX.Element => (
  <RootWrapper>
    <RootLayout />
  </RootWrapper>
);

export default RootApp;
