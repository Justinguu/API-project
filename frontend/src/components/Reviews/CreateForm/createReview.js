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
  const [stars, setStars] = useState(5);
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
    return <div key={i}>{error}</div>
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
           <div className="Review-text-review">Review</div> 
            <div className="create-review-input-container">
              <textarea
                className="create-review-input"
                type="string"
                placeholder="Write your review..."
              
                value={review}
                onChange={(e) => 
                  setReview(e.target.value)}
              />
            </div>
          </label>
          <label className="create-review-label">
           <div className="starRating-space">Star Rating</div> 
            <div>
              <input
                className="create-star-input"
                type="integer"
                placeholder="1 - 5"
                step="1"
              
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
    </div>
    )
  );
}
export default CreateReviewForm;