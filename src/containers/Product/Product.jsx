import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../../redux/actions/productActions';
import { useState } from 'react';

const Product = (props) => {

   const productDetails = useSelector(state => state.productDetails);
   const {product, loading, error} = productDetails;
   const [qty, setQty] = useState(1);
   const dispatch = useDispatch();

   useEffect(() => {
       dispatch(detailsProduct(props.match.params.id));
       
   }, []);

   const handleAddToCart = () => {
       props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
   }
    
    return (
        <div>
        <div className="back-to-result">
            <Link to="/">Back</Link>
        </div>
        {loading ? <div>Loading...</div> : 
        error? <div>{error}</div> :
        (
            <div className="details">
            <div className="details-image">
                <img src={product.image_path} alt="product"/>
            </div>
            <div className="details-info">
                <ul>
                    <li>
                    <h4>{product.name}</h4>
                    </li>
                    <li>
                    Price: <b> {product.price} EUR</b>
                    </li>
                    {/* <li>{product.size}</li> */}
                    <li>Description: {product.description}</li>
                </ul>
            </div>
            <div className="details-action">
                <ul>
                    <li>
                        Price: {product.price} EUR
                    </li>
                    <li>
                  Status: {product.stock > 0 ? "In Stock" : "Unavailable."}
                </li>
                    <li>
                    Qty: <select value={qty} onChange={(e) => { setQty(e.target.value) }}>
                    {[...Array(product?.stock).keys()].map(x =>
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    )}
                  </select>
                    </li>
                    <li>
                        {product.stock > 0 && <button onClick={handleAddToCart} className="button primary">Add To Cart</button>}
                    </li>
                </ul>
            </div>
        </div>

        )}
            </div>

    )
}

export default Product
