import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { getCurrSpotThunk } from "../../../store/spots";
import { getCurrReviewsThunk } from "../../../store/reviews";

import { Modal } from "../../../context/Modal";

import EditSpotForm from "../EditForm/EditForm";
import SpotDelete from "../SpotDelete/deleteSpot";
import ReviewGetComponent from "../../Reviews/ReviewGet";
import CreateBooking from "../../Bookings/CreateBookings.js";

import starIcon from "../GetAllSpots/starIcon.png";
import superHost from "../../icons/superHost.png";
import airCover from "../../icons/airCover.png";
import quality from "../../icons/qualityPicc.png";
import offers from "../../icons/offers.png";


import "./GetCurrSpot.css";

const GetSpotDetails = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [setReviews] = useState(false);
  const todayDate = new Date().toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [disabled, setDisabled] = useState(true);

  const { spotId } = useParams();
  const user = useSelector((state) => state.session.user);
  const currSpot = useSelector((state) => state.spots[spotId]);

  const allReviews = useSelector((state) => state.reviews);

  const getAllReviewsArr = Object.values(allReviews);

  const history = useHistory();


    // to dynamically render the price based on different dates

    let dateInt;

    if (
      isNaN((new Date(endDate) - new Date(startDate)) / 86400000) ||
      (new Date(endDate) - new Date(startDate)) / 86400000 < 0
    ) {
      dateInt = 0;
    } else {
      dateInt = (new Date(endDate) - new Date(startDate)) / 86400000;
    }
  

  const sessionReview = !user
    ? null
    : getAllReviewsArr.find((review) => review.userId === user.id);
  useEffect(() => {
    setDisabled(!!sessionReview);
  });

  const addReview = (e, spotId) => {
    e.preventDefault();
    history.push(`/spots/${spotId}/review`);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrReviewsThunk(spotId));
    dispatch(getCurrSpotThunk(spotId)).then(() => setIsLoaded(true));
  }, [dispatch, spotId]);

  if (!isLoaded) {
    return <div></div>;    // if not loaded, wait for it to load..
  }

  if (currSpot === undefined) {  // if stuck on curr page ,make it push to home
    return history.push("/");
  }

  if (isLoaded && currSpot.Owner === undefined) {
    dispatch(getCurrSpotThunk(spotId));
    return <div></div>;
  }

  const rating = currSpot?.avgStarRating == 0 ? "New" : currSpot?.avgStarRating;

  return (
    isLoaded && (
      <>
        <div className="whole-page-container">
          <div className="whole-page-wrapper">
            <div className="currSpot-header">
              <h2 className="currSpot-name">{currSpot.name}</h2>
            </div>
            <div>
              <p>
                <img className="getCurr-star-icon" src={starIcon} alt="" />
                {Number(rating).toFixed(1)}
                &nbsp;· {currSpot.reviewss} reviews &nbsp;·  &nbsp;{" "} 
                {/* <span><img className="superhost" src={superHost} /> SuperHost</span> */}
                {currSpot.city}, {currSpot.state}, {currSpot.country}
              </p>
              <p className="price-text"> ${currSpot.price} night</p>
              <div className="imgParentContainer">
          <div className="mainImgContainer">
            <img
              className="Big"
              src={currSpot.Images[0].url}
              // key={"imageId: " + JSON.stringify(index) + "big"}
              alt="NOT FOUND"
            />
          </div>
          <div className="secondaryImgContainer">
            <img
              className="oneSpot-Image small"
              src={currSpot.Images[0].url}
              // key={"imageId: " + JSON.stringify(index) + "topleft"}
              alt="NOT FOUND"
            />

            <img
              className="oneSpot-Image small corner-top"
              src={currSpot.Images[0].url}
              // key={"imageId: " + JSON.stringify(index) + "topright"}
              alt="NOT FOUND"
            />
            <img
              className="oneSpot-Image small"
              src={currSpot.Images[0].url}
              // key={"imageId: " + JSON.stringify(index) + "bottomleft"}
              alt="NOT FOUND"
            />
            <img
              className="oneSpot-Image small corner-bottom"
              src={currSpot.Images[0].url}
              // key={"imageId: " + JSON.stringify(index) + "bottomright"}
              alt="NOT FOUND"
            />
          </div>
        </div>
            
            </div>
            {currSpot.ownerId === user?.id && (
                <div>
                  <button
                    className="EditSpot-button"
                    onClick={() => setShowUpdate(true)}
                  >
                    Edit Spot{" "}
                  </button>{" "}
                  &nbsp;&nbsp;&nbsp;
                  <button
                    className="DeleteSpot-button"
                    onClick={() => setShowDelete(true)}
                  >
                    Delete Spot
                  </button>
                  {showUpdate && (
                    <Modal onClose={() => setShowUpdate(false)}>
                      <EditSpotForm
                        spotId={spotId}
                        setShowUpdate={setShowUpdate}
                      />
                    </Modal>
                  )}
                  {showDelete && (
                    <Modal onClose={() => setShowDelete(false)}>
                      <SpotDelete
                        spotId={spotId}
                        setShowDelete={setShowDelete}
                      />
                    </Modal>
                  )}
                </div>
              )}
            <div className="spot-hosted-by">
              Spot hosted by {currSpot.Owner.firstName}&nbsp;{currSpot.Owner.lastName}
              
            </div>
              
            <div className="description-checkin-container">
          <div className="checkin-description">
            <img  className="aircover "src={airCover}/>
            <div className="aircover-text">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
            <div className="currSpot-description">{currSpot.description}</div>
            <div><img className="qualityPic" src={quality}/></div>

            <div>
              <img className="offers-pic" src={offers}/>
            </div>
            
          </div>
          <div className="checkin">
            <div className="checkin-star-price">
              <div>{`$${currSpot.price} /night`}</div>
              <span className="spancheckin">
                <div>
                <img className="getCurr-star-icon" src={starIcon} alt="" />
                {/* {Number(rating.toFixed(2))} */}
                  {/* {currSpot.reviewss} */}
                </div>
                <div>·</div>
                <span>{currSpot.reviewss} reviews</span>
              </span>
            </div>
            <div className="spotDetailBoxTwo ">
              <CreateBooking
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                todayDate={todayDate}
                startDate={startDate}
                endDate={endDate}
                spotId={spotId}
              />
              <span className="you-wont-be-charged">
                You won't be charged yet
              </span>
            </div>

            <div className="checkin-star-price">
             <strong><div>Cleaning Fee</div></strong> 
              <div>Applied after checkout</div>
            </div>
            <div className="checkin-star-price">
             <strong><div>Service Fee</div></strong> 
              <div>Applied after checkout</div>
            </div>
            <div className="checkin-star-price total-price">
              <strong><div>Total before Taxes</div></strong>
              <div>${currSpot.price}</div>
            </div>
          </div>
        </div>


            {/* <div className="currSpot-description">{currSpot.description}</div> */}

            <div>
            
              <p className="numReview-star">
                <img className="review-star-icon" src={starIcon} alt="" />{" "}
                {Number(rating).toFixed(1)} · {currSpot.reviewss} reviews
              </p>
            </div>
            <div>
              {!user
                ? null
                : currSpot.ownerId !== user?.id && (
                    <button
                      className="review-spot-button"
                      disabled={disabled}
                      onClick={(e) => addReview(e, currSpot.id)}
                    >
                      Review Spot
                    </button>
                  )}
                    {disabled && (
                      <div className="review-text-disabled">Thanks for leaving a review for this spot</div>
                    )}

              <ReviewGetComponent
                spotId={spotId}
                user={user}
                setReviews={setReviews}
              />
            </div>
            
          </div>
        </div>
      </>
    )
  );
};

export default GetSpotDetails;
