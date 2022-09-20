import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './index';




  function SignUpFormModal({signUpFormModal, setSignUpFormModal}) {
    // const [signUpFormModal, setSignUpFormModal] = useState(false);
    

    return (
      <>  
        {signUpFormModal && (
          <Modal  onClose={() => setSignUpFormModal(false)}>
            <SignupFormPage setSignUpFormModal={setSignUpFormModal}/>
          </Modal>
        )}
        
      </>
    );
  }

export default SignUpFormModal;
