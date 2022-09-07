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
  const [setReviews] = useState(false);

  const { spotId } = useParams();
  const user = useSelector((state) => state.session.user);
  const currSpot = useSelector((state) => state.spots[spotId]);

  const allReviews = useSelector((state) => state.reviews);

  const getAllReviewsArr = Object.values(allReviews);
  const [userIds, setUserIds] = useState(false);
  const history = useHistory();

  const addReview = (e, spotId) => {
    e.preventDefault();
    history.push(`/spots/${spotId}/review`);
  };

  useEffect(() => {
    setUserIds(getAllReviewsArr.map((review) => review.userId));
  }, [allReviews]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrReviewsThunk(spotId));
    dispatch(getCurrSpotThunk(spotId)).then(() => setIsLoaded(true));
  }, [dispatch, spotId]);

  const rating = currSpot?.avgStarRating == 0 ? "New" : currSpot?.avgStarRating;

  return (
    isLoaded && (
      <>
        <div>
          <h2>{currSpot.name}</h2>
        </div>
        <div>
          <p>
            {currSpot.city}, {currSpot.state} {currSpot.country}
          </p>
          <p>Price: ${currSpot.price}</p>
          <img className="img-currSpots" src={currSpot.Images[0].url} alt="" />
        </div>
        <div>Spot hosted by {currSpot.Owner.firstName}</div>
        <div >
          
          <p>
            Rating:
            <img
              className="getCurr-star-icon"
              src={starIcon}
              alt=""
            />
            {
                 parseFloat(currSpot.avgStarRating).toFixed(1)
               }
            
  
          </p>
          
        </div>
        <div>
        {currSpot.ownerId !== user?.id && !userIds.includes(user?.id) && <button onClick={(e) => addReview(e, currSpot.id)}>Review Spot</button>}
          {currSpot.ownerId === user?.id && (
            <div>
              <button onClick={() => setShowUpdate(true)}>Edit Spot</button>
              <button onClick={() => setShowDelete(true)}>Delete Spot</button>
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
      </>
    )
  );
};

export default GetSpotDetails;
