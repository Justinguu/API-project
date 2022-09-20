import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignupFormPage/SignUpModal';
import './Navigation.css';
import logo from './Images/Logo.png'
import textLogo from './Images/text.png'



function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);


  return (
    <nav className='main-navbar'>
      <div className='svg-container' onClick={() => history.push('/')}>
        <img className='logo' src={logo} />   <img className='textLogo' src={textLogo} />
      </div>
      {isLoaded && (
        <div className='right-profile-container'>
          <ProfileButton user={sessionUser} isLoaded={isLoaded}
          setShowLogin={setShowLogin}
          setShowSignup={setShowSignup}
        
          />
        </div>
      )}
       {showLogin && ( <LoginFormModal showLogin={showLogin} setShowLogin={setShowLogin}
         
        />
      )}
      {showSignup && ( <SignUpFormModal showSignup={showSignup} setShowSignup={setShowSignup}
       
        />
      )}
    </nav>
  );
}

export default Navigation;
