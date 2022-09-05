import React from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logo from './Images/Logo.png'
import textLogo from './Images/text.png'


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()

  return (
    <nav className='main-navbar'>
      <div className='svg-container' onClick={() => history.push('/')}>
        <img className='logo' src={logo} />   <img className='textLogo' src={textLogo} />
      </div>
      {isLoaded && (
        <div className='right-profile-container'>
          <ProfileButton user={sessionUser} isLoaded={isLoaded} />
        </div>
      )}
    </nav>
  );
}

export default Navigation;
