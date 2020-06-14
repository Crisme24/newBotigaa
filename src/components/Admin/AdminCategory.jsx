import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveCategory, listCategories, deleteCategory } from '../../redux/actions/categoryActions';
import Fade from 'react-reveal/Fade'


function AdminCategory(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
 
  const categoryList = useSelector(state => state.categoryList);
  const { categories } = categoryList;
  console.log(categories)

  const categorySave = useSelector(state => state.categorySave);
  const { loading: loadingSave, success: successSave, error: errorSave } = categorySave;

  const categoryDelete = useSelector(state => state.categoryDelete);
  const {  success: successDelete  } = categoryDelete;
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listCategories());
  
  }, [successSave, successDelete]);

  const openModal = (category) => {
    setModalVisible(true);
    setId(category.id);
    setName(category.name);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveCategory({
      id: id,
      name
    }));
  }
  const deleteHandler = (category) => {
    dispatch(deleteCategory(category.id));
  }
  return <div className="content content-margined">

    <div className="product-header">
      <h3>Categories</h3> 
      <button className="button primary" onClick={() => openModal({})}>Create Category</button>
    </div>
    {modalVisible &&
    <Fade left cascade>
      <div className="form">
        <form onSubmit={submitHandler} >
          <ul className="form-container">
            <li>
              <h2>{id ? "Update Category" : "Create Category"}</h2>
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
          </tr>
        </thead>
        <tbody>
          {categories?.map(category => (<tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>
              <button className="button " onClick={() => openModal(category)} >Edit</button>
              {' '}
              <button className="button " onClick={() => deleteHandler(category)} >Delete</button>
            </td>
          </tr>))}
        </tbody>
      </table>

    </div>
  </div>
}
export default AdminCategory;