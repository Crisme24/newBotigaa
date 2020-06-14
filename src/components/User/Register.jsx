import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/actions/userActions';
import Fade from 'react-reveal/Fade'


const Register = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userRegister = useSelector(state=>state.userRegister);
    const {loading, userInfo, error} = userRegister;
    const dispatch = useDispatch();

    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

   useEffect(() => {
      if(userInfo){
          props.history.push(redirect)
      }
       
   }, [userInfo]);

   const submitHandler = (e) => {
       e.preventDefault();
       dispatch(register(name, email, password));
   }

   
    return(
        <div className="form">
        <Fade right cascade>
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Register</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="name">Name</label>
                    <input type="name" name="name" id="name" required onChange={(e) => setName(e.target.value)}/>
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
                    <button type="submit" className="button primary black">Register</button>
                </li>
                <li>
                    Already have an account?
                    
                    <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button primary white" >Sign In</Link>

                </li>
            </ul>
        </form>
        </Fade>
    </div>
    )
}

export default Register;
