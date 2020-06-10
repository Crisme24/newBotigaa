import axios from 'axios'
import { API_URL } from '../../api-config'
import { CART_ADD_ITEM } from '../types';

const addToCart = (id, qty) => async(dispatch) => {
    try {
        const {data} = await axios.get(API_URL + '/products/' + id);
        dispatch({
            type: CART_ADD_ITEM, payload: {
                product: data.id,
                name: data.name,
                image: data.image_path,
                price: data.price,
                stock: data.stock,
                size: data.size,
                qty
            }
        })
    } catch (error) {
        
    }
}

export {addToCart}