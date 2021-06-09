import React from 'react';
import {Route, Switch} from 'react-router';
import MainPage from '../pages/MainPage/MainPage';

/**
 * Корневые слои
 */
const RootLayout = (): JSX.Element => (
  <Switch>
    {/* Главная страница */}
    <Route component={MainPage} />
  </Switch>
);

export default RootLayout;
