import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";

import { Modal } from "../../context/Modal";

import { getAllSpotsThunk, getCurrSpotThunk } from "../../store/spots";

import EditSpotForm from "../Spots/EditForm/EditForm";
import SpotDelete from "../Spots/SpotDelete/deleteSpot";

import "./UserProfile.css";

const UserProfile = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currUserSpot, setCurrUserSpot] = useState(false)

//   const { spotId } = useParams();
  const user = useSelector((state) => state.session.user);
//    const spotPlacement = useSelector((state) => state.spots[spotId]);

  const currSpot = useSelector((state) => state.spots);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllSpotsThunk())
    .then(() => setIsLoaded(true));
  }, [dispatch]);
  




  // find how many spots the user has
  const userSpots = Object.values(currSpot).filter((spot) => spot.ownerId === user.id);

  return (
    isLoaded && (
      <div className="user-container">
        <div className="user-wrapper">
          {/* <span>
            <img src={user.profileImage} className="user-pfImage" alt="user profile" />
          </span> */}

          <div>
            <h1>Welcome {user.username} </h1>
          </div>

          <div className="user-emails"></div>

          <div className="business-bottom-container">
            <div className="single-rest-container-left">
              {userSpots.map((spot) => {
                return (
                  <div className="all-restraunts-container" key={spot.id}>
                    <div className="">
                      <div className="singleUserBusinessContainer">
                        <div>
                          <button className="EditSpot-button" onClick={() => {setShowUpdate(true); setCurrUserSpot(spot)}}>
                            Edit Spot{" "}
                          </button>{" "}
                          &nbsp;&nbsp;&nbsp;
                          <button className="DeleteSpot-button" onClick={() => {setShowDelete(true);setCurrUserSpot(spot)}}>
                            Delete Spot
                          </button>
                          {showUpdate && (
                            <Modal onClose={() => setShowUpdate(false)}>
                              <EditSpotForm spotId={currUserSpot.id}  setShowUpdate={setShowUpdate} />
                            </Modal>
                          )}
                          {showDelete && (
                            <Modal onClose={() => setShowDelete(false)}>
                              <SpotDelete spotId={currUserSpot.id} setShowDelete={setShowDelete} />
                            </Modal>
                          )}
                        </div>
                        <NavLink to={`/spots/${spot.id}`}>
                          <div className="currSpot-name">
                            <strong>{spot.name}</strong>
                          </div>{" "}
                          <div className="price-claim"></div>
                          <img className="user-business-image" src={spot.Images[0].url} alt="restraunt" />
                        </NavLink>
                        <div className="user-business-info">
                          <div>
                            <strong>Rating = </strong>
                            {spot.avgRating}
                          </div>
                          <div>
                            <strong>Business Address = </strong> {spot.address} {spot.city}, {spot.state},{spot.country}{" "}
                            {spot.zip_code}
                          </div>
                          <div>
                            <strong>Business Price =</strong> ${spot.price}/night{" "}
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
                            {spot.description}
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
