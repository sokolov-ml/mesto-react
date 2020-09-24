import React from 'react';

import PopupWithForm from './PopupWithForm';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser(
      {
        name,
        about: description,
      },
      setIsLoading
    );
  }

  return (
    <PopupWithForm title='Редактировать профиль' name='edit-profile' {...props} onSubmit={handleSubmit}>
      <label htmlFor='input-profile-name' className='popup__field'>
        <input
          type='text'
          name='name'
          id='input-profile-name'
          className='popup__input popup__input_field_name'
          required
          minLength='2'
          maxLength='40'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className='popup__input-error' id='input-profile-name-error' />
      </label>
      <label htmlFor='input-profile-about' className='popup__field'>
        <input
          type='text'
          name='about'
          id='input-profile-about'
          className='popup__input popup__input_field_about'
          required
          minLength='2'
          maxLength='200'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <span className='popup__input-error' id='input-profile-about-error' />
      </label>
      <button type='submit' className='popup__save'>
        {isLoading ? 'Сохранение...' : 'Сохранить'}
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
