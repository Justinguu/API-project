import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { createReviewThunk} from "../../../store/reviews"
import { getCurrSpotThunk } from "../../../store/spots";
import "./createReview.css"

function CreateReviewForm() {
  const history = useHistory();
  const { spotId } = useParams();
  const currentUser = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots[spotId]);

  const dispatch = useDispatch();


  const [isLoaded, setisLoaded] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(1);
  const [errors, setErrors] = useState([]);




  const validateForm = () => {
    const newErrors = [];

    if (review.length <= 0) {
      newErrors.push("Please leave a review");
    }
    if (stars < 1 || stars > 5) {
      newErrors.push("Rating must be an number from 1 to 5.");
    }
    setErrors(newErrors);
  }
  useEffect(() => {
    dispatch(getCurrSpotThunk(spotId)).then(() => setisLoaded(true))
  },[dispatch, spotId])

  if (spot?.Owners?.id === currentUser.id) {
    <Redirect to={`/spots/${spot.id}`} />; //throw error
  }
  let errorMessages = errors.map((error, i) => {
    return <div className = "single-error" key={i}>{error}</div>
  })

  useEffect(() => {
    validateForm()
  },[review,stars])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true)

    if (errors.length > 0) {
      return;
    }
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
    isLoaded && (
    <div className="create-review-form-container">
      <form className="create-review-form" onSubmit={handleSubmit}>
        <div className="create-review-header-container">
          <h2 className="create-review-header">How Was Your Experience With This Spot?</h2>
          <img
                className="review-Spot-image"
                src={spot.Images[0].url}
                alt=""
              />
          
        </div>
        <div className="create-review-errors">
          {submit && errorMessages}
        </div>

        <div className="modal-body">
          <label className="create-review-label">
           <div className="Review-text-review">Describe Your Experince:</div> 
            <div className="create-review-input-container">
              <textarea
                className="create-review-input"
                type="string"
                placeholder="How was your experience?"
              
                value={review}
                onChange={(e) => 
                  setReview(e.target.value)}
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
        <div className="review-submit-container">
          <button
            className="create-review-submit-button"
            type="submit"
            
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
    )
  );
}
export default CreateReviewForm;