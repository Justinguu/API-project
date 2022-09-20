import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm.css';


  function LoginFormModal({showLogin, setShowLogin}) {
  
    return (
      <>
        {showLogin && (
          <Modal className='login-modal' onClose={() => setShowLogin(false)}>
            <LoginForm setShowLoginModal={setShowLogin}/>
          </Modal>
        )}
      </>
    );
  }

export default LoginFormModal;
