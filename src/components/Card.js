import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  // const [cardId, setCardId] = React.useState(card._id);
  const [isLiked, setIsLiked] = React.useState(card.likes.some((item) => item._id === currentUser._id));
  const [likeCounter, setLikeCounter] = React.useState(card.likes.length);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card._id, isLiked)
      .then((response) => {
        setLikeCounter(response.likes.length);
        setIsLiked(!isLiked);
      })
      .catch(() => {
        console.log('can`t render like');
      });
  }

  return (
    <li className='elements__element'>
      <img src={card.link} alt={card.name} className='elements__image' onClick={handleClick} />
      {card.owner._id === currentUser._id ? (
        <button className='elements__remove' onClick={() => onCardDelete(card._id)}></button>
      ) : (
        ''
      )}
      <div className='elements__caption'>
        <p className='elements__title'>{card.name}</p>
        <div className='elements__like'>
          <button
            className={`elements__like-button ${isLiked ? 'elements__like-button_active' : ''}`}
            onClick={handleLikeClick}
            title={card.likes.map((user) => user.name).join(', ')}
          ></button>
          <p className='elements__like-counter'>{likeCounter}</p>
        </div>
      </div>
    </li>
  );
}
