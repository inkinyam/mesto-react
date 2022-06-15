import React from 'react';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js';
import ContentLoader from './ContentLoader.js'; // пока не используется
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js'; 
import api from "../utils/api.js";
import EditProfilePopup from './EditProfilePopup.js';


const App = () => {
  const [currentUser, getCurrentUser] = React.useState({name: '', about: '', avatat: ''});

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
  const [selectedCard, setSelectedCard]                  = React.useState({name: '', link: ''});


/* обработчики событий */
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

  const closeAllPopups = () => {
    openEditPopup(false);
    openAddPopup(false);
    openUpdateAvatarPopup(false);
    openConfirmPopup (false); //пока не используем
    setSelectedCard({name: '', link: ''});
  }

  const handleUpdateUser = ({name, about}) => {
    api.postUserData(name, about)
      .then((userData)=>{
        getCurrentUser(userData);
      })
  }

  
/* возвращаемый объект */
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />
          <Main onEditProfile = {handleOpenEditPopup}
                onAddPlace    = {handleOpenAddPopup} 
                onEditAvatar  = {handleOpenUpdateAvatarPopup}
                onCardClick   = {handleCardClick}/>
          <Footer />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} 
                            onClose={closeAllPopups} 
                            onUpdateUser={handleUpdateUser} /> 

          <PopupWithForm  name    = 'add' 
                          title   = 'Новое место'
                          btnText = 'Сохранить'
                          isOpen  = {isAddPlacePopupOpen}
                          onClose = {closeAllPopups}>
                          
            <input type="text" className="popup__item popup__item_el_name" id="add-form__name" name="popup_title" placeholder="Название места" minLength="2" maxLength="30" required />
            <span className="popup__span-error add-form__name-error"></span>

            <input type="url" className="popup__item popup__item_el_link" id="add-form__link"  name="popup_sutitle" placeholder="Ссылка на картинку" required />
            <span className="popup__span-error add-form__link-error"></span>
          </PopupWithForm>


          <PopupWithForm  name    = 'update-avatar' 
                          title   = 'Обновить аватар'
                          btnText = 'Сохранить'
                          isOpen  = {isUpdateAvatarPopupOpen}
                          onClose = {closeAllPopups}>

            <input type="url" className="popup__item popup__item_el_avatar" id="update-avatar-form__avatar"  name="inputAvatarLink" placeholder="Ссылка на новую картинку" required />
            <span className="popup__span-error update-avatar-form__avatar-error"></span>
          </PopupWithForm>

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
