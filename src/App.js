import React from 'react';

import api from './components/utils/Api';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import PopupWithForm from './components/PopupWithForm';
import PopupWithImage from './components/PopupWithImage';
import EditAvatarPopup from './components/EditAvatarPopup';
import EditProfilePopup from './components/EditProfilePopup';
import AddPlacePopup from './components/AddPlacePopup';

import { CurrentUserContext } from './contexts/CurrentUserContext.js';

import './App.css';
import logo from './images/header__logo.svg';
import imgAvatar from './images/profile__photo.png';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isRemoveCardPopupOpen, setIsRemoveCardPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState();
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: imgAvatar });
  // const currentUser = React.createContext();

  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    api
      .getCards()
      .then((result) => {
        setCards(result);
      })
      .catch(() => {
        console.error('can`t get userInfo');
      });
  }, []);

  function handleCardLike(cardId, isLiked) {
    if (isLiked) {
      return api.setLikeCardOff(cardId).catch(() => {
        console.error('can`t unset like');
      });
    } else {
      return api.setLikeCardOn(cardId).catch(() => {
        console.error('can`t set like');
      });
    }
  }

  function handleCardDelete(cardId) {
    api
      .removeCard(cardId)
      .then(() => {
        setCards(cards.filter((card) => card._id !== cardId));
        // popupRemoveCard.close();
      })
      .catch(() => {
        console.error('can`t delete cards');
      })
      .finally(() => {
        // popupRemoveCard._saveButton.textContent = 'Да';
      });
  }

  React.useEffect(() => {
    api
      .getCurrentUserInfo()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch(() => {
        console.error('can`t get userInfo');
      });
  }, []);

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
    setSelectedCard();
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(obj, func) {
    func(true);
    api
      .updateCurrentUserInfo(obj.name, obj.about)
      .then((response) => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch(() => {
        console.error('can`t update userinfo');
      })
      .finally(() => {
        func(false);
      });
  }

  function handleUpdateAvatar(obj, func) {
    func(true);
    api
      .updateCurrentUserPhoto(obj.avatar)
      .then((response) => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch(() => {
        console.error('can`t update user avatar');
      })
      .finally(() => {
        func(false);
      });
  }

  function handleAddPlaceSubmit(obj, func) {
    func(true);
    api
      .addNewCard(obj.name, obj.link)
      .then((response) => {
        setCards([response, ...cards]);
        closeAllPopups();
      })
      .catch(() => {
        console.error('can`t add card');
      })
      .finally(() => {
        func(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='content'>
        <Header logo={logo} />

        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        >
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

          <PopupWithForm title='Вы уверены?' name='remove-card' isOpen={isRemoveCardPopupOpen} onClose={closeAllPopups}>
            <button type='submit' className='popup__save'>
              Да
            </button>
          </PopupWithForm>
          <PopupWithImage card={selectedCard} onClose={closeAllPopups}></PopupWithImage>
        </Main>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
