import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeActiveModal } from '../../storage/slices/modalSlice';
import './index.sass';
import closeModalIcon from './img/ic-close-modal.svg';

export const Modal = ({ children }) => {
  const isActiveModal = useSelector((state) => state.modal.isActiveModal);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const closeModalByEscape = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        document.removeEventListener('keydown', closeModalByEscape);
        dispatch(changeActiveModal(false));
        navigate('/');
      }
    },
    [navigate, dispatch]
  );

  const closeModal = () => {
    dispatch(changeActiveModal(false));
    navigate('/');
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModalByEscape);
  }, [closeModalByEscape]);

  return (
    <div className={`modal ${isActiveModal && 'modal_active'}`}>
      <div className="modal__content">
        <img
          className="modal__content__close_modal"
          src={closeModalIcon}
          alt="close-modal"
          onClick={closeModal}
        />
        {children}
      </div>
    </div>
  );
};
