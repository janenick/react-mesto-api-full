import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name: name,
      link: link
    });
    e.target.reset();
  }


  function handleNameChange(event) {
    setName(event.target.value);
  }


  function handleLinkChange(event) {
    setLink(event.target.value);
  }


  return (
    <PopupWithForm
      name='new-place'
      title='Новое место'
      submitName='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className='popup__form-field'>
        <input id='new-place-name-input' name='popup__input-new-place-name' value={name || ''} onChange={handleNameChange} type='text' placeholder='Название' className='popup__input popup__input_type_new-place-name' required minLength='1' maxLength='30' />
        <span id='new-place-name-input-error' className='popup__input-error'></span>
      </label>
      <label className='popup__form-field'>
        <input id='new-place-img-input' name='popup__input-new-place-img' value={link || ''} onChange={handleLinkChange} type='url' placeholder='Ссылка на картинку' className='popup__input popup__input_type_new-place-img' required />
        <span id='new-place-img-input-error' className='popup__input-error'></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
