import React from 'react'
import { useEffect } from 'react';
import {useDispatch} from 'react-redux'
import { addToCart } from '../../redux/actions/cartActions';


function Cart (props)  {

    const productId = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split('=') [1] ) : 1;
    const dispatch = useDispatch();

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty));
        }
    }, []);
    return (
        <div>
            Cart
        </div>
    )
}

export default Cart
