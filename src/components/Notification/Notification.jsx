import React from 'react';
import './index.sass';

export const Notification = ({ type = 'error', children }) => {
  console.log(children);
  return (
    <>
      {children.message !== 'Необходима авторизация' && (
        <div className={`notification ${type}`}>{children.message}</div>
      )}
    </>
  );
};
