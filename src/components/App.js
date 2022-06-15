import React from 'react';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js';

import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import UpdateAvatarPopup from './UpdateAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js'

import api from "../utils/api.js";
import { CurrentUserContext } from '../context/CurrentUserContext.js'; 


const App = () => {
  /*установка контекста для пользователя*/
  const [currentUser, getCurrentUser] = React.useState({name: '', about: '', avatar: ''});

  React.useEffect(()=>{
    api.getUserData()
      .then((userData)=>{
        getCurrentUser(userData);
      })
      .catch((err) => console.error(err));
  }, []);

  /* хуки на открытие попапов */
  const [isEditProfilePopupOpen, openEditPopup]          = React.useState(false);
  const [isAddPlacePopupOpen, openAddPopup]              = React.useState(false);
  const [isCconfirmPopupOpen, openConfirmPopup]          = React.useState(false); //пока не используем
  const [isUpdateAvatarPopupOpen, openUpdateAvatarPopup] = React.useState(false);
  
  /*хук на определение выбранной карточки*/
  const [selectedCard, setSelectedCard]                  = React.useState({name: '', link: ''});


  /* обработчики  */
  const handleOpenEditPopup = ()=> {
    openEditPopup(true);
  }

  const handleOpenAddPopup = ()=> {
    openAddPopup(true);
  }

  const handleOpenUpdateAvatarPopup = ()=> {
    openUpdateAvatarPopup(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  /*функция на закрытие попапов*/
  const closeAllPopups = () => {
    openEditPopup(false);
    openAddPopup(false);
    openUpdateAvatarPopup(false);
    openConfirmPopup (false); //пока не используем
    setSelectedCard({name: '', link: ''});
  }

  /*функция обновления данных пользователя через api*/
  const handleUpdateUser = ({name, about}) => {
    api.postUserData(name, about)
      .then((userData)=>{
        getCurrentUser(userData);
      })
      .catch((err) => console.error(err));
  }

  /*функция обновления аватара пользователя через api*/
  const handleUpdateAvatar = (avatar) => {
    api.postUserPhoto(avatar)
      .then((userData)=>{
        getCurrentUser(userData);
      })
      .catch((err) => console.error(err));
  }

  /*хук карточек*/ 
  const [cards, setCards] = React.useState([]);
    
  /*получаем карточки с api*/ 
  React.useEffect(()=>{
    api.getCards()
      .then((cardsData)=>{
        setCards(cardsData);
      })
      .catch((err) => console.error(err));
  }, [])

  /* обработчик нажатия кнопки лайк на карточке*/ 
  const handleCardLike = (card) => {
     const isLiked = card.likes.some(i => i._id === currentUser._id);

    /*в соответствии с вернувшимся результатом вызываем нужный метод api*/
    if (isLiked) {
      api.deleteLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => console.error(err));
    } else {
      api.putLike(card._id, isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => console.error(err));
      }
  }

  /* обработчик нажатия кнопки удаления на карточке*/ 
  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then (()=>{
        setCards((state) => state.filter((c)=>c._id !== card._id))
      })
      .catch((err) => console.error(err));
  }

  /*обработчик добавления нового фото*/

  const handleAddPlaceSubmit = ({cardName, link}) => {
    api.postCard(cardName, link)
      .then((newCard)=>{
        setCards([newCard, ...cards])
      })
      .catch((err) => console.error(err));
  }
  
/* возвращаемый объект */
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />
          <Main onEditProfile     = {handleOpenEditPopup}
                onAddPlace        = {handleOpenAddPopup} 
                onEditAvatar      = {handleOpenUpdateAvatarPopup}
                onCardClick       = {handleCardClick}
                cards             = {cards}
                onCardLikeClick   = {handleCardLike}
                onCardDeleteClick = {handleCardDelete} />
          <Footer />
 
          <EditProfilePopup isOpen       = {isEditProfilePopupOpen} 
                            onClose      = {closeAllPopups} 
                            onUpdateUser = {handleUpdateUser} /> 


          <UpdateAvatarPopup isOpen={isUpdateAvatarPopupOpen} 
                             onClose={closeAllPopups} 
                             onUpdateAvatar={handleUpdateAvatar} />


          <AddPlacePopup isOpen = {isAddPlacePopupOpen} 
                         onClose = {closeAllPopups} 
                         onAddPlace = {handleAddPlaceSubmit}/>


          <PopupWithForm  name    = 'confirm' 
                          title   = 'Вы уверены?'
                          btnText = 'Да'
                          isOpen  = {isCconfirmPopupOpen} 
                          onClose = {closeAllPopups}/>

          <ImagePopup card    = {selectedCard}
                      onClose = {closeAllPopups}/>
        </div>
      </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
