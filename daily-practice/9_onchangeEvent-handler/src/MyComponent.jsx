import React, {useState} from "react";
import { use } from "react";

function MyComponent(){

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState();

    const [comment, setComment] = useState('');

    const [payment, setPayment] = useState('');

    const [shipping, setShipping] = useState('');

    function handleNameChange(e){
        setName(e.target.value);
    }
    function handleQuantityChange(e){
        setQuantity(e.target.value);
    }

    function handleCommentChange(e){
        setComment(e.target.value)
    }

    function handlePaymentChange(e){
        setPayment(e.target.value);
    }

    function handlerShippingChange(e){
        setShipping(e.target.value)
    }
    return(
        <>
        <div>
            <input type="text" onChange={handleNameChange}/>
            <p>Name : {name}</p>

            <input type="number" onChange={handleQuantityChange}/>
            <p>Quantity : {quantity}</p>

            <textarea name={comment} onChange={handleCommentChange} placeholder="Please Write Your Comment Here"></textarea>
            <p>Commet : {comment}</p>
             
             <select value={payment} onChange={handlePaymentChange}>
                <option value="">Select the Option</option>
                <option value="Visa">Visa</option>
                <option value="MasterCard">Master Card</option>
                <option value="GiftCard">Gift Card</option>
             </select>

             <p>Payment Opotion : {payment}</p>

             <label>
                <input type="radio" value='PickUp' onChange={handlerShippingChange} checked={shipping === 'Pick Up'}/>
                Pick Up
             </label>

            <label>
                <input type="radio" value='PickUp' onChange={handlerShippingChange} checked={shipping === 'Pick Up'}/>
                Pick Up
             </label>
        </div>
        </>
    )
}

export default MyComponent