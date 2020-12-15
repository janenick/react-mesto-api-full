import React from 'react';
import singFail from '../images/popup/sing-fail.svg';
import singSuccess from '../images/popup/sing-success.svg';

function InfoTooltip({
  name, isOpen, onClose, status, message,
}) {
  const singImg = status ? singSuccess : singFail;
  // const singText = status ? 'Вы успешно зарегистрировались!' :  'Что-то пошло не так! Попробуйте ещё раз.';
  const singText = message;

  return (
    <div className={`popup popup_name_${name} ${isOpen && 'popup_opened'}`}>
      <div className='popup__container popup__container_type_popup'>
        <button type='button' className='popup__btn-close' onClick={onClose}></button>

        <img className='popup__icon' src={singImg} alt={`Иконка с ответом сервера ${singText}`} />
        <p className='popup__text-info-tooltip'>{singText}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
