import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { updateReviewThunk } from "../../../store/reviews";
import { getCurrReviewsThunk } from "../../../store/reviews";
import "./editReview.css";

function ReviewEditForm({ setShowUpdateReview, currReview, spotId }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;

  const [stars, setStars] = useState(currReview.stars);
  const [review, setReview] = useState(currReview.review);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errors = [];

    if (review.length <= 0) {
      errors.push("Please leave a review");
    }
    if (stars < 1 || stars > 5) {
      errors.push("Rating must be an number from 1 to 5.");
    }
    return setErrors(errors);
  }, [review, stars]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (errors.length > 0) {
      return alert("Please fix errors before submitting");
    }

    dispatch(updateReviewThunk(currReview.id, userId, spotId, review, stars)).then(() =>
      dispatch(getCurrReviewsThunk(spotId))
    );
    setShowUpdateReview(false);
  };
console.log(userId)
  const errorList = errors.map((error) => (
    <p key={error}>{error}</p>
))

return (
    <div className="edit-review-container">
        <div className="edit-review-wrapper">
            <div className="edit-review-header-container">
                <div className="edit-review-header">Edit Your Review</div>
                <div className="edit-review-close-bttn" onClick={() => setShowUpdateReview(false)}>X</div>
            </div>

            <form className="edit-review-form" onSubmit={handleSubmit}>
                <div className="create-review-errors">
                    {isSubmitted && errorList}
                </div>
                <div className="modal-body">
                    <label className="create-review-label">
                        Describe Your Experince:
                        <div className="create-review-input-container">
                            <textarea
                                className="edit-review-input"
                                type="string"
                                placeholder="How was your experience?"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            />
                        </div>
                    </label>
                    <div className="combined-line-rating">
          <div className="text-rating-edit">Select your rating</div>
          <div className="rating-stars">
            <div class="star-container">
              <div
                onClick={() => setStars(5)}
                value={stars}
                className={
                  stars >= 5 ? "fa-regular fa-star s5-checked " : "fa-regular fa-star s5"
                }
              ></div>
              
              <div
                onClick={() => setStars(4)}
                value={stars}
                className={
                  stars >= 4 ? "fa-regular fa-star s4-checked" : "fa-regular fa-star s4"
                }
              ></div>
              <div
                onClick={() => setStars(3)}
                value={stars}
                className={
                  stars >= 3 ? "fa-regular fa-star s3-checked" : "fa-regular fa-star s3"
                }
              ></div>
              <div
                onClick={() => setStars(2)}
                value={stars}
                className={
                  stars >= 2 ? "fa-regular fa-star s2-checked" : "fa-regular fa-star s2"
                }
              ></div>
              <div
                onClick={() => setStars(1)}
                value={stars}
                className={
                  stars >= 1 ? "fa-regular fa-star s1-checked" : "fa-regular fa-star s1"
                }
              ></div>
            </div>
            
      
          </div>
        </div>
                </div>
                <div className="edit-review-submit-container">
                    <button
                        className="edit-review-submit-button"
                        type="submit"
                        disabled={isSubmitted && errors.length > 0}
                    >
                        Submit Review
                    </button>
                </div>
            </form>
        </div>
    </div>
);
}
export default ReviewEditForm;
