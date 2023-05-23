import React, { useCallback, useEffect } from 'react';
import './index.sass';
import closeModal from './img/ic-close-modal.svg';

export const Modal = ({ isActiveModal, setIsActiveModal, children }) => {
  useEffect(() => setIsActiveModal(true), []);

  const closeByEscape = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        document.removeEventListener('keydown', closeByEscape);
        setIsActiveModal(false);
      }
    },
    [setIsActiveModal]
  );
  document.addEventListener('keydown', closeByEscape);

  useEffect(() => {
    document.addEventListener('keydown', closeByEscape);
  }, [closeByEscape]);

  return (
    <div className={`modal ${isActiveModal && 'modal_active'}`}>
      <div className="modal__content">
        <img
          className="modal__content__close_modal"
          src={closeModal}
          alt="close-modal"
          onClick={() => setIsActiveModal(false)}
        />
        {children}
      </div>
    </div>
  );
};
