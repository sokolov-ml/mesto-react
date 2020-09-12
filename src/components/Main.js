import React from 'react';
import api from './utils/Api';
import Card from './Card';

import imgAvatar from '../images/profile__photo.png';
import imgEdit from '../images/profile__edit.svg';
import imgAdd from '../images/profile__add.svg';

export default function Main(props) {
  const [userId, setUserId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState(imgAvatar);

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    console.log('refresh userinfo');
    api
      .getCurrentUserInfo()
      .then((result) => {
        setUserId(result._id);
        setUserName(result.name);
        setUserDescription(result.about);
        setUserAvatar(result.avatar);
      })
      .catch(() => {
        console.error('can`t get userInfo');
      });
  }, []);

  React.useEffect(() => {
    console.log('refresh cards');
    api
      .getCards()
      .then((result) => {
        setCards(result);
      })
      .catch(() => {
        console.error('can`t get userInfo');
      });
  }, []);

  return (
    <>
      <section className='profile'>
        <div className='profile__photo-overlay' onClick={props.onEditAvatar}>
          <img src={userAvatar} alt='Фото профиля' className='profile__photo' />
        </div>
        <div className='profile__info'>
          <div className='profile__title'>
            <h1 className='profile__name'>{userName}</h1>
            <button className='profile__edit-btn' onClick={props.onEditProfile}>
              <img src={imgEdit} alt='Редактировать' className='profile__edit-img' />
            </button>
          </div>
          <p className='profile__status'>{userDescription}</p>
        </div>
        <button className='profile__add-btn' onClick={props.onAddPlace}>
          <img src={imgAdd} alt='Добавить' className='profile__add-img' />
        </button>
      </section>
      <ul className='elements'>
        {cards.map((card) => (
          <Card card={card} currentUserId={userId} key={card._id} onCardClick={props.onCardClick} />
        ))}
      </ul>
      {props.children}
    </>
  );
}
