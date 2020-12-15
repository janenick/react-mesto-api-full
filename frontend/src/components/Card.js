import React from 'react';
import CurrentUserContext from '../contexts/currentUserContext';

const Card = (props) => {
  const currentUser = React.useContext(CurrentUserContext);
  const { card } = props;

  // Определяем, являемся ли мы владельцем текущей карточки
  // const isOwn = card.owner._id === currentUser._id;
  const isOwn = String(card.owner) === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `element__btn-trash ${isOwn ? 'element__btn-trash_active' : ''}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__btn-like ${isLiked ? 'element__btn-like_active' : ''}`
  );

  function handleClick() {
    props.onCardClick(card);
  }

  function handleLikeClick() {
    props.onCardLike(card);
  }

  function handleDeleteClick(evt) {
    props.onCardDelete(evt, card);
  }

  return (
    < div className='element'>
      <div className='element__container' onClick={handleClick}>
        {isOwn && <button type='button' className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>}
        <img className='element__img' src={card.link} alt={card.alt} />
      </div>
      <div className='element__info'>
        <h2 className='element__title'>{card.name}</h2>
        <div className='element__like-group'>
          <button type='button' className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className='element__like-sum'>{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
