import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getCurrSpotThunk } from "../../../store/spots";
import { getCurrReviewsThunk } from "../../../store/reviews";
import { Modal } from "../../../context/Modal";
import EditSpotForm from "../EditForm/EditForm";
import SpotDelete from "../SpotDelete/deleteSpot";
import ReviewGetComponent from "../../Reviews/ReviewGet";
import starIcon from "../GetAllSpots/starIcon.png"

import "./GetCurrSpot.css";

const GetSpotDetails = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showReviewModal,setReviews] = useState(false);
  const [disabled, setDisabled] = useState(true)

  const { spotId } = useParams();
  const user = useSelector((state) => state.session.user);
  const currSpot = useSelector((state) => state.spots[spotId]);

  const allReviews = useSelector((state) => state.reviews);

  const getAllReviewsArr = Object.values(allReviews);
  // const [userIds, setUserIds] = useState(false);
  const history = useHistory();

  const sessionReview = !user ? null : getAllReviewsArr.find(review => 
    review.userId === user.id)
  useEffect(() => {
    setDisabled(!!sessionReview)
  })

  const addReview = (e, spotId) => {
    e.preventDefault();
    history.push(`/spots/${spotId}/review`);
  };

  // useEffect(() => {
  //   setUserIds(getAllReviewsArr.map((review) => review.userId));
  // }, [allReviews]);

  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getCurrReviewsThunk(spotId));
    dispatch(getCurrSpotThunk(spotId)).then(() => setIsLoaded(true));
  }, [dispatch, spotId]);

 if(isLoaded && currSpot.Owner === undefined){
    dispatch(getCurrSpotThunk(spotId)) 
    return (<div>Loading...</div>)
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
          <div></div>
          <p>
          <img className="getCurr-star-icon"src={starIcon}alt=""/>{Number(rating).toFixed(2)}
          &nbsp;· {currSpot.reviewss} reviews &nbsp;·
                &nbsp; {currSpot.city}, {currSpot.state}, {currSpot.country}
          </p>
          <p className="price-text"> ${currSpot.price} night</p>
          <img className="img-currSpots" src={currSpot.Images[0].url} alt="" />
        </div>
        <div className="spot-hosted-by">Spot hosted by {currSpot.Owner.firstName}</div>
    

        
        <div >
          
          {/* <p>
            Rating:
            <img
              className="getCurr-star-icon"
              src={starIcon}
              alt=""
            />
            {Number(rating).toFixed(1)}
          </p> */}
          <p className="numReview-star">
          <img className="review-star-icon"src={starIcon}alt=""/> {Number(rating).toFixed(1)} · {currSpot.reviewss} reviews
          </p>
        </div>
        <div>
        {!user ? null :currSpot.ownerId !== user?.id &&  <button className="review-spot-button" disabled={disabled} onClick={(e) => addReview(e, currSpot.id) 
        }>Review Spot</button>}
        

        {/* {showReview && (
                <Modal onClose={() => setReviews(false)}>
                  <SpotDelete spotId={spotId} setReviews={setReviews} />
                </Modal>
              )} */}


          {currSpot.ownerId === user?.id && (
            <div>
              <button className="EditSpot-button" onClick={() => setShowUpdate(true)}>Edit Spot </button> &nbsp;&nbsp;&nbsp;
              <button className="DeleteSpot-button" onClick={() => setShowDelete(true)}>Delete Spot</button>
              {showUpdate && (
                <Modal onClose={() => setShowUpdate(false)}>
                  <EditSpotForm spotId={spotId} setShowUpdate={setShowUpdate} />
                </Modal>
              )}
              {showDelete && (
                <Modal onClose={() => setShowDelete(false)}>
                  <SpotDelete spotId={spotId} setShowDelete={setShowDelete} />
                </Modal>
              )}
            </div>
          )}
          <ReviewGetComponent spotId={spotId} user={user} setReviews={setReviews} />
        </div>
        <div>
        </div>
        </div>
        </div>
      </>
    )
  );
};

export default GetSpotDetails;
