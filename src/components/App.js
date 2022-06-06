import  '../../src/index.css';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js';
import ContentLoader from './ContentLoader.js';

function App() {
  return (
    <div className="App">
      <div className="page">
        <Header />
        <ContentLoader />
        <Main />
        <Footer />

      <section className="popup popup-edit">
        <form className="popup__wrapper edit-form" name="editForm" noValidate>
          <button className="popup__button popup__button_type_exit popup-edit__exit" type="button"></button>
          <h2 className="popup__title">Редактировать профиль</h2>
          <input type="text" className="popup__item popup__item_el_title" id="edit-form__title" value="" name="popup_title" placeholder="Введите имя" minLength="2" maxLength="40" required />
          <span className="popup__span-error edit-form__title-error"></span>

          <input type="text" className="popup__item popup__item_el_subtitle" id="edit-form__subtitle" value="" name="popup_sutitle" placeholder="Введите должность" minLength="2" maxLength="200" required />
          <span className="popup__span-error edit-form__subtitle-error"></span>
          <button type="submit" className="popup__button popup__button_type_save popup-edit__save popup__button_type_disabled" disabled>Сохранить</button>
        </form>
      </section>


      <section className="popup popup-add">
        <form className="popup__wrapper add-form" name="addForm" noValidate>
          <button className="popup__button popup__button_type_exit popup-add__exit" type="button"></button>
          <h2 className="popup__title">Новое место</h2>
          <input type="text" className="popup__item popup__item_el_name" id="add-form__name" value="" name="popup_title" placeholder="Название места" minLength="2" maxLength="30" required />
          <span className="popup__span-error add-form__name-error"></span>

          <input type="url" className="popup__item popup__item_el_link" id="add-form__link" value="" name="popup_sutitle" placeholder="Ссылка на картинку" required />
          <span className="popup__span-error add-form__link-error"></span>

          <button type="submit" className="popup__button popup__button_type_save popup-add__save popup__button_type_disabled" disabled> Сохранить</button>
        </form>
      </section>

 
      <section className="popup popup-confirm">
        <form className="popup__wrapper confirm-form" name="confirmForm">
          <button className="popup__button popup__button_type_exit popup-confirm__exit" type="button"></button>
          <h2 className="popup__title">Вы уверены?</h2>
          <button type="submit" className="popup__button popup__button_type_save popup-confirm__save"> Да </button>
        </form>
      </section>


      <section className="popup popup-update-avatar ">
        <form className="popup__wrapper update-avatar-form" name="updateAvatarForm" noValidate>
          <button className="popup__button popup__button_type_exit popup-update-avatar__exit" type="button"></button>
          <h2 className="popup__title">Обновить аватар</h2>

          <input type="url" className="popup__item popup__item_el_avatar" id="update-avatar-form__avatar" value="" name="inputAvatarLink" placeholder="Ссылка на новую картинку" required />
          <span className="popup__span-error update-avatar-form__avatar-error"></span>

          <button type="submit" className="popup__button popup__button_type_save update-avatar-form__save">Сохранить</button>
        </form>
      </section>


      <section className="popup popup-photo">
        <div className="popup__figure">
          <button className="popup__button popup__button_type_exit popup-photo__exit" type="button"></button>
          <img className="popup__image" src="#" alt="#" />
          <p className="popup__caption"> </p>
        </div>
      </section>
      </div>
    </div>
  );
}

export default App;
