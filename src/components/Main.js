import api from "../utils/api.js";
import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js'; 

const Main = ({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) => {
  /*хуки для установки данных на страницу*/ 
  const [cards, setCards] = React.useState([]);
  /* подписываемся на контекст */
  const currentUser = React.useContext(CurrentUserContext);

  /*получаем карточки с api*/ 
  React.useEffect(()=>{
    api.getCards()
      .then((cardsData)=>{
        setCards(cardsData);
      })
      .catch((err) => console.error(err));
  }, [])

  const handleCardLike = (card) => {
    /* проверяем лайкнута ли карточка*/ 
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    /*в соответствии с вернувшимся результатом вызываем нужный метод api*/
    if (isLiked) {
      api.deleteLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    } else {
      api.putLike(card._id, isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
      }
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then (()=>{
        setCards((state) => state.filter((c)=>c._id !== card._id))
      })
  }

/* возвращаемый объект */
  return (
    <main className="content content_visible">
      <section className="profile">
        <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
        <button type="button" className="profile__edit-avatar" onClick={onEditAvatar}></button>
        <div className="profile__name">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
        </div>
        <p className="profile__subtitle">{currentUser.about}</p>
        <button type="button" className="profile__add-button" onClick={onAddPlace}> </button>
      </section>

      <section className="places" aria-label="Фотографии">

        {cards.map(card => (
             <Card key={card._id} card={card} onCardClick={onCardClick} onLikeClick={handleCardLike} onDeleteClick={handleCardDelete} />
        ))}

       </section>
    </main>
  )
}
export default Main;


