import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProdcut } from '../../redux/actions/productActions';
import Fade from 'react-reveal/Fade'


function AdminProduct(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image_path, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const productList = useSelector(state => state.productList);
  const { products } = productList;
  console.log(products)
  const productSave = useSelector(state => state.productSave);
  const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

  const productDelete = useSelector(state => state.productDelete);
  const {  success: successDelete  } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
  
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product.id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image_path);
    setCategory(product.category);
    setStock(product.stock);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProduct({
      id: id,
      name, price, image_path, category,
      stock, description
    }));
  }
  const deleteHandler = (product) => {
    dispatch(deleteProdcut(product.id));
  }
  return <div className="content content-margined">

    <div className="product-header">
      <h3>Products</h3> 
      <button className="button primary" onClick={() => openModal({})}>Create Product</button>
    </div>
    {modalVisible &&
    <Fade left cascade>
      <div className="form">
        <form onSubmit={submitHandler} >
          <ul className="form-container">
            <li>
              <h2>{id ? "Update Product" : "Create Product"}</h2>
            </li>
            <li>
              {loadingSave && <div>Loading...</div>}
              {errorSave && <div>{errorSave}</div>}
            </li>

            <li>
              <label htmlFor="name">
                Name
          </label>
              <input type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="price">
                Price
          </label>
              <input type="text" name="price" value={price} id="price" onChange={(e) => setPrice(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="image">
                Image
          </label>
              <input type="text" name="image" value={image_path} id="image" onChange={(e) => setImage(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="stock">
                Stock
          </label>
              <input type="text" name="stock" value={stock} id="stock" onChange={(e) => setStock(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="category">
                Category
          </label>
              <input type="text" name="category" value={category} id="category" onChange={(e) => setCategory(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="description">
                Description
          </label>
              <textarea name="description" value={description} id="description" onChange={(e) => setDescription(e.target.value)}></textarea>
            </li>
            <li>
              <button type="submit" className="button primary black">{id ? "Update" : "Create"}</button>
            </li>
            <li>
              <button type="button primary white" onClick={() => setModalVisible(false)} className="button primary white">Back</button>
            </li>
          </ul>
        </form>
      </div>

      </Fade>
    }


    <div className="product-list">

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.map(product => (<tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.category}</td>
            <td>{product.stock}</td>
            <td>
              <button className="button " onClick={() => openModal(product)} >Edit</button>
              {' '}
              <button className="button " onClick={() => deleteHandler(product)} >Delete</button>
            </td>
          </tr>))}
        </tbody>
      </table>

    </div>
  </div>
}
export default AdminProduct;