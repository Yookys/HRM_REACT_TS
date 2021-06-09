import React from 'react';
import RootWrapper from './components/RootWrapper/RootWrapper';
import RootLayout from './layouts/MainLayout';

/**
 * Корневое приложение
 */
const RootApp = (): JSX.Element => (
  <RootWrapper>
    <RootLayout />
  </RootWrapper>
);

export default RootApp;
