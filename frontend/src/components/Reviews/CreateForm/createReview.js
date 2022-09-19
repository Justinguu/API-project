import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { createReviewThunk} from "../../../store/reviews"
import "./createReview.css"

function CreateReviewForm() {
  const history = useHistory();
  const { spotId } = useParams();
  const currentUser = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots[spotId]);
  const dispatch = useDispatch();


  
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(5);
  const [errors, setErrors] = useState([]);




  const validateForm = () => {
    const newErrors = [];

    if (review.length <= 0) {
      newErrors.push("Please write a review.");
    }
    if (stars < 1 || stars > 5) {
      newErrors.push("Rating must be an number from 1 to 5.");
    }
    setErrors(newErrors);
  }


  if (spot?.Owners?.id === currentUser.id) {
    <Redirect to={`/spots/${spot.id}`} />; //throw error
  }
  let errorMessages = errors.map((error, i) => {
    return <li key={i}>{error}</li>
  })

  useEffect(() => {
    validateForm()
  },[review,stars])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // history.push(`/spots/${spotId}`);
   

    const payload = {
      spotId,
      // userId,
      review,
      stars,
    };

    const createdReview = dispatch(createReviewThunk(payload));

    if (createdReview) {
      history.push(`/spots/${spotId}`);
    }
  };


  return (
    <section className="create-review-form-container">
      <form className="create-review-form" onSubmit={handleSubmit}>
        <div className="create-review-header-container">
          <h3 className="create-review-header">How was your stay?</h3>
        </div>
        <div className="create-review-errors">
          {errorMessages}
         
        </div>
        <div className="modal-body">
          <label className="create-review-label">
            Review
            <div className="create-review-input-container">
              <input
                className="create-review-input"
                type="string"
                placeholder="Write your review..."
                required
                value={review}
                onChange={(e) => 
                  setReview(e.target.value)}
              />
            </div>
          </label>
          <label className="create-review-label">
            Star Rating
            <div>
              <input
                className="create-review-input"
                type="integer"
                placeholder="1 - 5"
                required
                value={stars}
                onChange={(e) => setStars(e.target.value)}
              />
            </div>
          </label>
        </div>
        <div className="review-submit-container">
          <button
            className="create-review-submit-button"
            type="submit"
            
          >
            Submit Review
          </button>
        </div>
      </form>
    </section>
  );
}
export default CreateReviewForm;