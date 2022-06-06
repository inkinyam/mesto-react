
function Main () {
  function handleEditProfileClick () {
    document.querySelector('.popup-edit').classList.add('popup_opened');
  }

  function handleEditAvatarClick () {
    document.querySelector('.popup-update-avatar').classList.add('popup_opened');
  }

  function handleAddPlaceClick () {
    document.querySelector('.popup-add').classList.add('popup_opened');
  }



  return (
    <main className="content content_visible">
      <section className="profile">
        <img className="profile__avatar" src="#" alt="аватар" />
        <button type="button" className="profile__edit-avatar" onClick={handleEditAvatarClick}></button>
        <div className="profile__name">
          <h1 className="profile__title">Жан Жак Шоподелать</h1>
          <button type="button" className="profile__edit-button" onClick={handleEditProfileClick}></button>
        </div>
        <p className="profile__subtitle">Я пока не понимаю что тут делаю</p>
        <button type="button" className="profile__add-button" onClick={handleAddPlaceClick}> </button>
      </section>

      <section className="places" aria-label="Фотографии">
      </section>
    </main>
  )
}
export default Main;