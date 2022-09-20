// frontend/src/components/SignupFormPage/index.js
import React, { useState, useEffect  } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage({setSignUpFormModal}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  



  // useEffect(() => {
  //   if(!signUpFormModal) return;

  //   const closeSignUpModal = () => {
  //     setSignUpFormModal(false)
  //   }
  //   document.addEventListener("click",closeSignUpModal );

  //   return () => document.removeEventListener("click",closeSignUpModal )

  // },[signUpFormModal])


  if (sessionUser) return <Redirect to="/" />;



  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({firstName,lastName, email, username, password }))
      .then(()=> setSignUpFormModal(false))
      .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    
    <form className="signup-modal" onSubmit={handleSubmit}>
      <div className="signup-modal-wrapper">
          <h3 className="signup-title">Sign up</h3>
        <div className="welcome">
          <h3 className="welcome-h3">Welcome to Justbnb</h3>
        </div>
        <div className="signup-input-wrapper">
          <input
            type="text"
            value={firstName}
            placeholder='First Name'
            className='form-input first'
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            value={lastName}
            placeholder='Last Name'
            className='form-input mid'
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="text"
            value={email}
            className='form-input mid'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            value={username}
            className='form-input mid'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            value={password}
            className='form-input mid'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            value={confirmPassword}
            className='form-input last'
            placeholder='Confirmed Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="signup-form-errors">
              {errors.length > 0 && (
            <ul className="errors-list">
              {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
              ))}
            </ul>
              )}
          </div>
        </div>
      
        <button className="signup submit-button" type="submit">Continue</button>
   </div> 
   </form>
  );
}

export default SignupFormPage;