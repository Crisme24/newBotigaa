import React from 'react'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { saveShipping } from '../../redux/actions/cartActions';
import Fade from 'react-reveal/Fade'
import CheckoutSteps from '../CheckoutSteps./CheckoutSteps';


const Shipping = (props) => {

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');


   const dispatch = useDispatch();

   const submitHandler = (e) => {
       e.preventDefault();
       dispatch(saveShipping({address, city, postalCode, country}));
       props.history.push('payment');
   }

   
    return <div>
    <CheckoutSteps step1 step2 ></CheckoutSteps>
    <div className="form">
        <Fade left cascade>
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Shipping</h2>
                </li>
                
                <li>
                    <label htmlFor="name">Address</label>
                    <input type="text" name="address" required id="address" onChange={(e) => setAddress(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="city">City</label>
                    <input type="text" name="city" id="city"required  onChange={(e) => setCity(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="text" name="postalCode" id="postalCode" required onChange={(e) => setPostalCode(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="country">Country</label>
                    <input type="text" name="country" id="country" required onChange={(e) => setCountry(e.target.value)}/>
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

export default Shipping;
