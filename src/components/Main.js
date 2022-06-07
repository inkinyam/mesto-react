import api from "../utils/api.js";
import React from 'react';
import Card from './Card.js'

const Main = ({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) => {
  /*хуки для установки данных на страницу*/ 
  const [userName, setUserName]               = React.useState(null);
  const [userDescription, setUserDescription] = React.useState(null);
  const [userAvatar, setUserAvatar]           = React.useState(null);
  const [cards, setCards]                     = React.useState([]);

  /*получаем данные юзера с api*/ 
  React.useEffect(()=>{
    api.getUserData()
      .then((userData)=>{
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch((err) => console.error(err));
  }, []);

  /*получаем карточки с api*/ 
  React.useEffect(()=>{
    api.getCards()
      .then((cardsData)=>{
        setCards(cardsData);
      })
      .catch((err) => console.error(err));
  }, [])


  return (
    <main className="content content_visible">
      <section className="profile">
        <img className="profile__avatar" src={userAvatar} alt="аватар" />
        <button type="button" className="profile__edit-avatar" onClick={onEditAvatar}></button>
        <div className="profile__name">
          <h1 className="profile__title">{userName}</h1>
          <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
        </div>
        <p className="profile__subtitle">{userDescription}</p>
        <button type="button" className="profile__add-button" onClick={onAddPlace}> </button>
      </section>

      <section className="places" aria-label="Фотографии">

        {cards.map(card => (
             <Card key={card._id} card={card} onCardClick={onCardClick} />
        ))}

       </section>
    </main>
  )
}
export default Main;


