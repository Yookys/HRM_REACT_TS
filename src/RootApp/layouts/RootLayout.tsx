import React from 'react';
import {Redirect, Route, Switch} from 'react-router';
import MainPage from '../pages/MainPage/MainPage';

/**
 * Корневые слои
 */
const RootLayout = (): JSX.Element => (
  <Switch>
    {/* Главная страница */}
    <Route exact path="/" component={MainPage} />
    {/* Редирект на основную страницу */}
    <Redirect to="/" />
  </Switch>
);

export default RootLayout;
