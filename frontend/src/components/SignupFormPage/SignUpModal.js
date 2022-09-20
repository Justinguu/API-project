import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './index';




  function SignUpFormModal({showSignup, setShowSignup}) {
    // const [signUpFormModal, setSignUpFormModal] = useState(false);
    

    return (
      <>  
        {showSignup && (
          <Modal  onClose={() => setShowSignup(false)}>
            <SignupFormPage setSignUpFormModal={setShowSignup}/>
          </Modal>
        )}
        
      </>
    );
  }

export default SignUpFormModal;
