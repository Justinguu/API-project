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
                <div className="edit-review-header">Edit Review</div>
                <div className="edit-review-close-bttn" onClick={() => setShowUpdateReview(false)}>X</div>
            </div>

            <form className="create-review-form" onSubmit={handleSubmit}>
                <div className="create-review-errors">
                    {isSubmitted && errorList}
                </div>
                <div className="modal-body">
                    <label className="create-review-label">
                        Describe Your Experince:
                        <div className="create-review-input-container">
                            <textarea
                                className="review-edit-input"
                                type="string"
                                placeholder="What was it like to stay here?"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            />
                        </div>
                    </label>
                    <label className="create-review-label">
                        Rating:
                        <div className="rating-input-container">
                            <input
                                className="rating-input"
                                type="number"
                                placeholder="1 - 5 stars"
                                minLength="1"
                                maxLength="5"
                                step="1"
                                value={stars}
                                onChange={(e) => setStars(e.target.value)}
                            />
                        </div>
                    </label>
                </div>
                <div className="edit-review-submit-container">
                    <button
                        className="create-review-button edit-review-submit-button"
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
