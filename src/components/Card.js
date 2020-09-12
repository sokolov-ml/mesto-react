import React from 'react';

export default function Card(props) {
  const [isMyCard, setIsMyCard] = React.useState(props.card.owner._id === props.currentUserId);
  const [isLiked, setIsLiked] = React.useState(props.card.likes.some((item) => item._id === props.currentUserId));

  function handleClick() {
    // console.log(props.card);
    props.onCardClick(props.card);
  }

  return (
    <li className='elements__element' onClick={handleClick}>
      <img src={props.card.link} alt={props.card.name} className='elements__image' />
      {!isMyCard ? '' : <button className='elements__remove'></button>}
      <div className='elements__caption'>
        <p className='elements__title'>{props.card.name}</p>
        <div className='elements__like'>
          <button className={`elements__like-button ${isLiked ? 'elements__like-button_active' : ''}`}></button>
          <p className='elements__like-counter'>{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
