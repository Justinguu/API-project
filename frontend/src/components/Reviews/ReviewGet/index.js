import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteReviewThunk, getCurrReviewsThunk } from "../../../store/reviews";
import { Modal } from "../../../context/Modal";
import { getCurrSpotThunk } from "../../../store/spots";
import EditReview from "../EditModal/editReview";
import editIcon from "../../icons/edit-icon.png";
import trashIcon from "../../icons/trashIcon.png"
import icon from "../../Navigation/Images/icon.svg";

import "./reviewGet.css";

const GetSpotReviews = ({ spotId }) => {
  const allReviews = useSelector((state) => Object.values(state.reviews));
  const getAllReviewArr = allReviews.filter((review) => review.spotId === parseInt(spotId));

  const [isLoaded, setIsLoaded] = useState(false);
  const [currReview, setCurrReview] = useState(false);
  const [showUpdateReview, setShowUpdateReview] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();

  const deleteReview = (e, id) => {
    e.preventDefault();
    dispatch(deleteReviewThunk(id)).then(() => dispatch(getCurrSpotThunk(spotId)));
  };

  useEffect(() => {
    dispatch(getCurrReviewsThunk(spotId)).then(() => setIsLoaded(true));
  }, [dispatch, spotId, showUpdateReview]);

  // const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short'};
  // let date = new Date(review.createdAt)

  return (
    isLoaded && (
      <div>
        <ul className="review-border">
          {Object.values(getAllReviewArr).map((review) => {
            // console.log(getAllReviewArr)
            return (
              <div className="review-box" key={review.id}>
                <div className="reviewe-box" style={{ fontSize: "16px", fontWeight: "800px" }}>
                  <div>
                    <img className="review-icon" src={icon} alt="" />
                  </div>{" "}
                  <div className="review-name">&nbsp;&nbsp;{review.User?.firstName}</div>
                </div>
                <div className="review-text">
                  {review.review} &nbsp; &nbsp;
                  {!sessionUser
                    ? null
                    : sessionUser.id === review.userId && (
                        <img
                          className="editButtonRevieww"
                          src={editIcon}
                          onClick={() => {
                            setShowUpdateReview(true);
                            setCurrReview(review);
                          }}
                        ></img>
                      )}
                  {showUpdateReview && (
                    <Modal onClose={() => setShowUpdateReview(false)}>
                      <EditReview
                        currReview={currReview}
                        spotId={spotId}
                        setShowUpdateReview={setShowUpdateReview}
                      />
                    </Modal>
                  )}
                  {!sessionUser
                    ? null
                    : sessionUser.id === review.userId && ( // even if not session user still be able to access spots
                        <img className="deleteButtonRevieww" src={trashIcon} onClick={(e) => deleteReview(e, review.id)}>
                        
                        </img>
                      )}
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    )
  );
};

export default GetSpotReviews;
