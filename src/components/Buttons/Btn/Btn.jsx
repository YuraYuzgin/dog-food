import React from 'react';
import './index.sass';

export const Btn = ({ color, children }) => {
  return <button className={`btn btn__${color}`}>{children}</button>;
};
