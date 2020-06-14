import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { signin } from '../../redux/actions/userActions';
import Fade from 'react-reveal/Fade'


const Signin = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state=>state.userSignin);
    const {loading, userInfo, error} = userSignin;
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

   useEffect(() => {
      if(userInfo){
          props.history.push(redirect)
      }
       
   }, [userInfo]);

   const submitHandler = (e) => {
       e.preventDefault();
       dispatch(signin(email, password));
   }

   
    return <div className="form">
        <Fade left cascade>
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Sign In</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required onChange={(e) => setEmail(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}/>
                </li>
                <li>
                    <button type="submit" className="button primary black">Signin</button>
                </li>
                <li>
                    New to Botigaa?
                </li>
                <li>
                <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button primary white" >Create your Botigaa account</Link>
                </li>
            </ul>
        </form>
        </Fade>
    </div>
}

export default Signin;
