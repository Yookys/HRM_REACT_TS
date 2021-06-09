import './RootWrapper.scss';
import React from 'react';

export interface IRootWrapperProps {
  children: any;
}

/**
 * Общая обёртка приложения
 */
const RootWrapper = ({children}: IRootWrapperProps): JSX.Element => (
  <div className="root-wrapper">
    <div className="root-wrapper__content">{children}</div>
  </div>
);

export default RootWrapper;
