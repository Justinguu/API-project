import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../LoginFormModal";
import icon from "./Images/icon.svg";
import lineLogo from "./Images/lineLogo.svg";
import "./ProfileButton.css";

export default function ProfileButton({ user, isLoaded }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const handleDemo = () => {
    const user = { credential: "demo@user.io", password: "password" };
    dispatch(login(user)).then(() => {
      setShowLoginModal(false);
      history.push("/");
    });
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);
  const sessionUser = useSelector((state) => state.session.user);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };


  return (
    <>
      {showLoginModal && (
        <LoginFormModal
          showLoginModal={showLoginModal}
          setShowLoginModal={setShowLoginModal}
        />
      )}
      {showSignUpModal && (
        <SignUpFormModal
          showSignUpModal={showSignUpModal}
          setShowSignUpModal={setShowSignUpModal}
        />
      )}
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
              <NavLink className="profile-list-item hover-link" onClick={logout} to="">
                Log Out
              </NavLink>
            </ul>
          )}
          {isLoaded && !sessionUser && (
            <ul className="profile-list">
              <li className="hover-link">
                <NavLink
                  className="profile-list-item"
                  onClick={() => setShowLoginModal(true)}
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
                  onClick={() => setShowSignUpModal(true)}
                  className="profile-list-item"
                  to="/signup"
                >
                  Sign Up
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      )}
    </>
  );
}
