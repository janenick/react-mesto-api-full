import React from 'react';

function ImagePopup({
  name, isOpen, onClose, card,
}) {
  return (
    <div className={`popup popup_name_${name} ${isOpen && 'popup_opened'}`}>
      <div className='popup__img-container'>
        <button type='button' className='popup__btn-close' onClick={onClose}></button>

        <img className='popup__img' src={card.link} alt={card.alt} />
        <p className='popup__caption'>{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
