import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteReviewThunk, getCurrReviewsThunk } from "../../../store/reviews";
import icon from "../../Navigation/Images/icon.svg";
import "./reviewGet.css";
import { Modal } from "../../../context/Modal";
import { getCurrSpotThunk } from "../../../store/spots";
import EditReview from "../EditModal/editReview";

const GetSpotReviews = ({ spotId }) => {
  const allReviews = useSelector((state) => Object.values(state.reviews));
  const getAllReviewArr = allReviews.filter((review) => review.spotId === parseInt(spotId));

  const [isLoaded, setIsLoaded] = useState(false);
  const [showUpdateReview, setShowUpdateReview] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();

  const deleteReview = (e, id) => {
    e.preventDefault();
    dispatch(deleteReviewThunk(id)).then(() => dispatch(getCurrSpotThunk(spotId)));
  };

  useEffect(() => {
    dispatch(getCurrReviewsThunk(spotId)).then(() => setIsLoaded(true));
  }, [dispatch, spotId]);

  // const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short'};
  // let date = new Date(review.createdAt)

  return (
    isLoaded && (
      <div>
        <ul className="review-border">
          {Object.values(getAllReviewArr).map((review) => {
            return (
              <div className="review-box" key={review.id}>
                <div className="reviewe-box" style={{ fontSize: "16px", fontWeight: "800px" }}>
                  <div>
                    <img className="review-icon" src={icon} alt="" />
                  </div>{" "}
                  <div className="review-name">&nbsp;&nbsp;{review.User.firstName}</div>
                </div>
                <div className="review-text">
                  {review.review} &nbsp; &nbsp;
                  {!sessionUser
                    ? null
                    : sessionUser.id === review.userId && ( // even if not session user still be able to access spots
                    
                        <button className="deleteButtonReview" onClick={(e) => deleteReview(e, review.id)}>
                          DeleteReview
                        </button>
                      )}
                      {/* {!sessionUser
                      ? null
                    : sessionUser.id === review.userId && ( // even if not session user still be able to access spots
                  <button
                className="editButtonReview"
                onClick={() => setShowUpdateReview(true)}
                ></button>
              )}
              {showUpdateReview && (
                <Modal onClose={() => setShowUpdateReview(false)}>
                  <EditReview review={review} setShowUpdateReview={setShowUpdateReview} />
                </Modal>
              )} */}
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
