import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/currentUserContext';

function EditProfilePopup(props) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.description);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
    e.target.reset();
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      submitName='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >

      <label className='popup__form-field'>
        <input id='name-input' name='popup__input-name' value={name || ''} onChange={handleNameChange} type='text' placeholder='Имя' className='popup__input popup__input_type_popup popup__input_type_name' required minLength='2' maxLength='40' />
        <span id='name-input-error' className='popup__input-error'></span>
      </label>
      <label className='popup__form-field'>
        <input id='status-input' name='popup__input-status' value={description || ''} onChange={handleDescriptionChange} type='text' placeholder='Вид деятельности' className='popup__input popup__input_type_popup popup__input_type_status' required minLength='2' maxLength='200' />
        <span id='status-input-error' className='popup__input-error'></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
