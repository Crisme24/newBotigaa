import React from 'react'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { savePayment } from '../../redux/actions/cartActions';
import Fade from 'react-reveal/Fade'
import CheckoutSteps from '../CheckoutSteps./CheckoutSteps';


const Payment = (props) => {

    const [paymentMethod, setPaymentMethod] = useState('');



   const dispatch = useDispatch();

   const submitHandler = (e) => {
       e.preventDefault();
       dispatch(savePayment({paymentMethod}));
       props.history.push('placeorder')
   }

   
    return <div>
    <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
    <div className="form">
        <Fade right cascade>
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Payment</h2>
                </li>
                <li>
                    <input type="radio" name="paymentMethod" id="paymentMethod" required value="paypal" onChange={(e) => setPaymentMethod(e.target.value)}/>
                    <label htmlFor="paymentMethod">Paypal</label>
                </li>
                <li>
                    <button type="submit" className="button primary black">Continue</button>
                </li>
                
            </ul>
        </form>
        </Fade>
    </div>
    </div>
}

export default Payment;
