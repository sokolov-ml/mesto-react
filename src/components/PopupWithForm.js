import React from 'react';

export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button type='button' className='popup__close' onClick={props.onClose}></button>
        <form className='popup__form popup__form_edit-profile' name='edit-profile'>
          <h2 className='popup__heading'>{props.title}</h2>
          {props.children}
        </form>
      </div>
    </div>
  );
}
