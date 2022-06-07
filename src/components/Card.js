
const Card= ({card, onCardClick}) => {
/*пробрасываемая из App функция установки state для открытия увеличенной фото*/
  
  const handleCardClick = () => {
    onCardClick(card); 
  };

  return (
    <div className="place">
      <button className="place__button-delete" type="button"></button>
      <img className="place__image" src={card.link} alt="" onClick={handleCardClick}/>
      <div className="place__description">
        <p className="place__text">{card.name}</p>
        <div className="place__like-container">
          <button className="place__button-like" type="button"></button>
          <p className="place__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>

  )
}
export default Card;