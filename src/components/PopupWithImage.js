import React from 'react';

export default function PopupWithImage(props) {
  console.log(props);
  return (
    <div className={`popup popup_show-image ${props.card ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button type='button' className='popup__close' onClick={props.onClose}></button>
        <figure className='popup__figure'>
          <img
            src={props.card ? props.card.link : '#'}
            alt={props.card ? props.card.name : ''}
            className='popup__image'
          />
          <figcaption className='popup__caption'>{props.card ? props.card.name : ''}</figcaption>
        </figure>
      </div>
    </div>
  );
}
