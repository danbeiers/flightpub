import React, {useState} from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import classes from './PaymentInputs.module.css';
import validator from 'validator';

function PaymentInputs() {

    const [number, setNumber] = useState('')
    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvc, setCvc] = useState('')
    const [focus, setFocus] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    function complete(){

        //validate and push to database here

        return(
        alert("Payment Complete!"));
    }

    const validateNumber = (value) => {

        if (validator.isCreditCard(value)) {
            setErrorMessage('Valid CreditCard Number')
        } else {
            setErrorMessage('Enter valid CreditCard Number!')
        }
    }

        return(

            <div className = "PaymentInputs" >
                <Cards
                number ={number}
                name ={name}
                expiry ={expiry}
                cvc={cvc}
                focused = {focus}
                />
                <br/>
            <form>
                <input type ='tel'
                       name = 'number'
                       placeholder= 'Card Number'
                       onChange={e => setNumber(e.target.value)}
                       onChange={e => validateNumber(e.target.value)}
                       onFocus={e=> setFocus(e.target.name)}
                />
                <input type ='text'
                       name = 'name'
                       placeholder= 'Name'
                       onChange={e => setName(e.target.value)}
                       onFocus={e=> setFocus(e.target.name)}
                       />
                <input type ='text'
                       name = 'expiry'
                       placeholder= 'MM/YY Expiry'
                       onChange={e => setExpiry(e.target.value)}
                       onFocus={e=> setFocus(e.target.name)}

                />
                <input type ='tel'
                       name = 'cvc'
                       placeholder= 'CVC'
                       onChange={e => setCvc(e.target.value)}
                       onFocus={e=> setFocus(e.target.name)}

                />


            </form>
                <br/>
                <button onClick={complete}>Make Payment</button>
            </div>
        );

}
export default PaymentInputs;
