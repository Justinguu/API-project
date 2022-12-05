import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";

import { Modal } from "../../context/Modal";

import { getAllSpotsThunk } from "../../store/spots";

import EditSpotForm from "../Spots/EditForm/EditForm";
import SpotDelete from "../Spots/SpotDelete/deleteSpot";

import "./UserProfile.css";

const UserProfile = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const { spotId } = useParams();
  const user = useSelector((state) => state.session.user);

  const currSpot = useSelector((state) => state.spots);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllSpotsThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // find how many spots the user has
  const userSpots = Object.values(currSpot).filter((spot) => spot.ownerId === user.id);
//   console.log("userSpots", userSpots);
  return (
    isLoaded && (
        <div className="user-container">
        <div className="user-wrapper">
          {/* <span>
            <img src={user.profileImage} className="user-pfImage" alt="user profile" />
          </span> */}
  
           <div><h1>Welcome {user.username} </h1></div> 
  
          <div className="user-emails"></div>
         
          <div className="business-bottom-container">
            <div className="single-rest-container-left">
              {userSpots.map((business) => {
                return (
                  <div className="all-restraunts-container" key={business.id}>
                    <div className="">
                      <div className="singleUserBusinessContainer">
                        <NavLink to={`/businesses/${business.id}`}>
                        <div className="currSpot-name"><strong>{business.name}</strong></div>{" "}
                        <div className="price-claim">
                          
                        </div>
                          <img className="user-business-image" src={business.previewImage} alt="restraunt" />
                        </NavLink>
                        <div className="user-business-info">
                            <div>
                                <strong>Rating = </strong>{business.avgRating}
                            </div>
                          <div>
                            <strong>Business Address = </strong> {business.address} {business.city}, {business.state},
                            {business.country} {business.zip_code}
                          </div>
                          <div>
                            <strong>Business Price =</strong> ${business.price}/night{" "}
                          </div>
                          <div>
                            {" "}
                            <strong>Business Email =</strong> {user.email}
                          </div>
                          {/* <div>
                            <strong>Business Category = </strong>
                            {business.category}
                          </div> */}
                          <div>
                            <strong>Business Description = </strong>
                            {business.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default UserProfile;
