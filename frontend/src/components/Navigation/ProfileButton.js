import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignupFormPage";
import icon from "./Images/icon.svg";
import lineLogo from "./Images/lineLogo.svg";
import "./ProfileButton.css";

export default function ProfileButton({ user, isLoaded, setShowLogin, setShowSignup }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const handleDemo = () => {
    const user = { credential: "demo@user.io", password: "password" };
    dispatch(login(user)).then(() => {
      setShowLogin(false);
      history.push("/");
    });
  };
// useEffect(() => {
//     if(!showLoginModal) return;

//     const closeSignUpModal = () => {
//       setSignUpFormModal(false)
//     }
//     document.addEventListener("click",closeSignUpModal );

//     return () => document.removeEventListener("click",closeSignUpModal )

//   },[showLoginModal])

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  // console.log("signup",signUpFormModal)
  // console.log("login",showLoginModal)

  const sessionUser = useSelector((state) => state.session.user);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  return (
    <>
      {/* {showLoginModal && ( <LoginFormModal showLoginModal={showLoginModal}
          setShowLoginModal={setShowLoginModal}
        />
      )}
      {signUpFormModal && ( <SignUpFormModal signUpFormModal={signUpFormModal} 
      setSignUpFormModal={setSignUpFormModal}
       
        />
      )} */}
      
      <div className="right-profile-container">
        <span className="host-hover-border">
          <NavLink className="become-host-link" to="/spots/create">
            Become a Host
          </NavLink>
        </span>
      </div>
      <div className="profile-button-border" onClick={openMenu}>
        <img className="triple-icon" src={lineLogo} />
        <img className="profile-icon" src={icon} />
      </div>
      {showMenu && (
        <div className="dropdown-menu">
          {isLoaded && sessionUser && (
            <ul className="profile-list">
              <li className="profile-list-item user-name-li">
                {user.username}
              </li>
              <NavLink
                className="profile-list-item hover-link"
                onClick={logout}
                to=""
              >
                Log Out
              </NavLink>
            </ul>
          )}
          {isLoaded && !sessionUser && (
            <ul className="profile-list">
              <li className="hover-link">
                <NavLink
                  className="profile-list-item"
                  onClick={() => setShowLogin(true)}
                  to=""
                >
                  Login
                </NavLink>
              </li>
              <li className="hover-link">
                <NavLink
                  className="profile-list-item"
                  onClick={() => handleDemo()}
                  to=""
                >
                  Demo Login
                </NavLink>
              </li>
              <li className="hover-link">
                <NavLink
                  onClick={() => setShowSignup(true)}
                  className="profile-list-item"
                  to=""
                >
                  Sign Up
                </NavLink>
               {/* <div><SignUpFormModal/></div>  */}
              </li>
            </ul>
          )}
        </div>
      )}
    </>
  );
}
