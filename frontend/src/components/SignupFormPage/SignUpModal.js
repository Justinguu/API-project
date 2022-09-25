
import { Modal } from '../../context/Modal';
import SignupFormPage from './index';




  function SignUpFormModal({showSignup, setShowSignup}) {
   
    

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
