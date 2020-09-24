import React from 'react';

import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(
      {
        name,
        link,
      },
      setIsLoading
    );
  }

  return (
    <PopupWithForm title='Новое место' name='add-card' {...props} onSubmit={handleSubmit}>
      <label htmlFor='input-addcard-location' className='popup__field'>
        <input
          type='text'
          name='location'
          id='input-addcard-location'
          placeholder='Название'
          className='popup__input popup__input_field_location'
          required
          minLength='1'
          maxLength='30'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className='popup__input-error' id='input-addcard-location-error' />
      </label>
      <label htmlFor='input-addcard-image' className='popup__field'>
        <input
          type='url'
          name='image'
          id='input-addcard-image'
          placeholder='Ссылка на картинку'
          className='popup__input popup__input_field_image'
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <span className='popup__input-error' id='input-addcard-image-error' />
      </label>
      <button type='submit' className='popup__save'>
        {isLoading ? 'Создание...' : 'Создать'}
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
