import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignupFormPage/SignUpModal";
import SearchBar from "../SearchBar";
import { searchAllThunk } from "../../store/search";
import "./Navigation.css";
import logo from "./Images/Logo.png";
import textLogo from "./Images/text.png";
import magnifyGlass from "../icons/magnifyGlass.jpeg";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchAllThunk());
  });

  return (
    <nav className="main-navbar">
      <div className="svg-container" onClick={() => history.push("/")}>
        <img className="logo" src={logo} /> <img className="textLogo" src={textLogo} />
      </div>
      {isLoaded && (
        <>
        <div className="search-bar">
          <SearchBar />
          <div className='search-bar-icon'>
          {/* <img src={magnifyGlass}></img> */}
          </div>
        </div>
        <div className="right-profile-container">
          <ProfileButton
            user={sessionUser}
            isLoaded={isLoaded}
            setShowLogin={setShowLogin}
            setShowSignup={setShowSignup}
          />
        </div>
        </>
      )}
      {showLogin && <LoginFormModal showLogin={showLogin} setShowLogin={setShowLogin} />}
      {showSignup && <SignUpFormModal showSignup={showSignup} setShowSignup={setShowSignup} />}
    </nav>
  );
}

export default Navigation;
