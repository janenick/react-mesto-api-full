import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/currentUserContext';

function Main(props) {
  // Подписываемся на контекст TranslationContext
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      <section className="profile section">
        <div className="profile__main">
          <div className="profile__avatar-box" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }} >

          </div>
          <div className="profile__info">
            <div className="profile__info-editor">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" className="profile__btn-edit" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__status">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="profile__btn-add" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements section">
        {props.cards.map((card) =>

          <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>

        )}
      </section>
    </main>
  );
}

export default Main;