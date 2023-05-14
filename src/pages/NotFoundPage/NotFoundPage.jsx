import React from 'react';
import './index.sass';

export const NotFoundPage = () => {
  return (
    <div className="not_found">
      <p className="not_found__code">404</p>
      <p className="not_found__text">Страница не найдена.</p>
    </div>
  );
};
