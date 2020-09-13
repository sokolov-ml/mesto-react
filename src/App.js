import React from 'react';
import './App.css';
import logo from './images/header__logo.svg';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import PopupWithForm from './components/PopupWithForm';
import PopupWithImage from './components/PopupWithImage';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isRemoveCardPopupOpen, setIsRemoveCardPopupOpen] = React.useState(false);
  const [isShowImagePopupOpen, setIsShowImagePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsRemoveCardPopupOpen(false);
    setIsShowImagePopupOpen(false);
    setSelectedCard();
  }

  function handleCardClick(card) {
    // console.log(card);
    setSelectedCard(card);
  }

  return (
    <div className='content'>
      <Header logo={logo} />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      >
        <PopupWithForm
          title='Обновить аватар'
          name='update-avatar'
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <label htmlFor='input-update-avatar' className='popup__field'>
            <input
              type='url'
              name='avatar'
              id='input-update-avatar'
              placeholder='Ссылка на картинку'
              className='popup__input popup__input_field_avatar'
              required
            />
            <span className='popup__input-error' id='input-update-avatar-error' />
          </label>
          <button type='submit' className='popup__save'>
            Сохранить
          </button>
        </PopupWithForm>
        <PopupWithForm
          title='Редактировать профиль'
          name='edit-profile'
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <label htmlFor='input-profile-name' className='popup__field'>
            <input
              type='text'
              name='name'
              defaultValue=''
              id='input-profile-name'
              className='popup__input popup__input_field_name'
              required
              minLength='2'
              maxLength='40'
            />
            <span className='popup__input-error' id='input-profile-name-error' />
          </label>
          <label htmlFor='input-profile-about' className='popup__field'>
            <input
              type='text'
              name='about'
              defaultValue=''
              id='input-profile-about'
              className='popup__input popup__input_field_about'
              required
              minLength='2'
              maxLength='200'
            />
            <span className='popup__input-error' id='input-profile-about-error' />
          </label>
          <button type='submit' className='popup__save'>
            Сохранить
          </button>
        </PopupWithForm>
        <PopupWithForm title='Новое место' name='add-card' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
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
              required
            />
            <span className='popup__input-error' id='input-addcard-image-error' />
          </label>
          <button type='submit' className='popup__save'>
            Создать
          </button>
        </PopupWithForm>
        <PopupWithForm title='Вы уверены?' name='remove-card' isOpen={isRemoveCardPopupOpen} onClose={closeAllPopups}>
          <button type='submit' className='popup__save'>
            Да
          </button>
        </PopupWithForm>
        <PopupWithImage card={selectedCard} onClose={closeAllPopups}></PopupWithImage>
      </Main>
      <Footer />
    </div>
  );
}

export default App;
