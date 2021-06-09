import './MainPage.scss';
import React from 'react';
import TestForm from '../../components/TestForm/TestForm';
import LoadContentWrapper from '../../../common/components/LoadedContentWrapper/LoadContentWrapper';
import ErrorComponent from '../../../common/components/ErrorComponent/ErrorComponent';

/**
 * Главная страница
 */
const MainPage = (): JSX.Element => (
  <div className="main-page">
    <LoadContentWrapper isLoading={false} isError={false} getError={(): JSX.Element => <ErrorComponent error={500} />}>
      <div className="main-page__content">
        <h3>Форма</h3>
        <TestForm />
      </div>
    </LoadContentWrapper>
  </div>
);

export default MainPage;
