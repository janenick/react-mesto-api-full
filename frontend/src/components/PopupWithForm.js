import React from 'react';

function PopupWithForm({ name, title, submitName, isOpen, onClose, onSubmit, children }) {
  return (
    <div className={`popup popup_name_${name}  ${isOpen && 'popup_opened'}`}>
      <div className='popup__container popup__container_type_popup'>
        <button type='button' className='popup__btn-close' onClick={onClose}></button>

        <form name={`popup__form-${name}`} onSubmit={onSubmit} className='popup__form' action='#' noValidate>
          <h2 className='popup__title'>{title}</h2>
          {children}
          <button type='submit' className='popup__btn-save popup__btn-save_type_popup'>{submitName}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;