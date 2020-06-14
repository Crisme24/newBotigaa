import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../../redux/actions/productActions';
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'

function Home(props) {
  const category =  props.match.params.id ? props.match.params.id : '';
  const productList = useSelector(state => state.productList);
  const {products, loading, error} = productList;
  const dispatch = useDispatch();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
      dispatch(listProducts(category));
  }, [category])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder))
  }

  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder))
  }

  return (
    <>
      {category && <h2>{category}</h2>}
      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input name="searchKeyword" onChange={(e) => setSearchKeyword(e.target.value)}/>
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
         
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul>
      <main className="main">
      <div className="content">
      <Fade bottom cascade={true}>
  
      {loading ? <div>Loading...</div> :
      error ? <div>{error}</div> :
        <ul className="products">
          {
            products?.map(product =>
          <li key={product.id}>
            <div className="product">
            <Link to={'/products/' + product.id}>
             <Zoom> 
              <img className="product-image" src={product.image_path} alt="product" />
              </Zoom>
              </Link>
              <div className="product-name">
                <Link to={'/products/' + product.id}>{product.name}</Link>
              </div>
            <div className="product-price">{product.price} EUR</div>
              
            </div>
          </li>)}
        </ul>
}
</Fade>
      </div>

    </main>
    </>
  );
}

export default Home;
