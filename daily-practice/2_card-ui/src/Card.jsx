import cardImage from './assets/card-img.jpg';

function Card(){
    return(
        <div className="card">
            <img src={cardImage} alt="Card image is not Found" />
            <div className="description">
                 <h2>Card Heading</h2>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, impedit. </p>
            </div>
           
        </div>    
    )
}

export default Card;