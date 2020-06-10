import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../../redux/actions/productActions';

function Home(props) {

  const productList = useSelector(state => state.productList);
  const {products, loading, error} = productList;
  const dispatch = useDispatch();

 

  useEffect(() => {
      dispatch(listProducts());
    
  }, [])

  return (
    
    <main className="main">
      <div className="content">
      {loading ? <div>Loading...</div> :
      error ? <div>{error}</div> :
        <ul className="products">
          {
            products?.map(product =>
          <li key={product.id}>
            <div className="product">
            <Link to={'/products/' + product.id}>
              <img className="product-image" src={product.image_path} alt="product" />
              </Link>
              <div className="product-name">
                <Link to={'/products/' + product.id}>{product.name}</Link>
              </div>
              <div className="product-brand">{product.category}</div>
            <div className="product-price">{product.price}</div>
              <div className="product-rating">4.5 Stars (10 Reviews)</div>
            </div>
          </li>)}
        </ul>
}
      </div>

    </main>
  
  );
}

export default Home;
