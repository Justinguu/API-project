// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Redirect, useHistory, useParams } from "react-router-dom";
// import { updateReviewThunk } from "../../../store/reviews";
// import "./editReview.css";

// function ReviewEditForm({ setShowUpdate }) {
    
//     const user = useSelector((state) => state.session.user);
//     const reviewPlacement = useSelector((state) => state.reviews[review]);
//     console.log(reviewPlacement)
//     const spotId = reviewPlacement.spotId;
//     const [stars, setStars] = useState(reviewPlacement.stars);
//     const [review, setReview] = useState(reviewPlacement.review);
//     const [errors, setErrors] = useState([]);
//     const [hasSubmitted, setHasSubmitted] = useState(false);
    
//     const dispatch = useDispatch();

//   useEffect(() => {
//     const errors = [];

//     if (review.length <= 0) {
//       errors.push("Please leave a review");
//     }
//     if (stars < 1 || stars > 5) {
//       errors.push("Rating must be an number from 1 to 5.");
//     }
//     return setErrors(errors);
//   }, [review, stars]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setHasSubmitted(true);

//     if (errors.length > 0) {
//       return alert("Please fix errors before submitting");
//     }
//     const payload = {
//       spotId,
//       review,
//       stars,
//     };
//     dispatch(updateReviewThunk(payload));
//     setShowUpdate(false);
//   };

//   return (
//     <div className="review-edit-form">
//       <form className="review-edit-form" onSubmit={handleSubmit}>
//         <div className="review-errorHandlingContainer">
//           {errors.length > 0 &&
//             errors.map((error, i) => (
//               <div className="review-error" key={i}>
//                 {error}
//               </div>
//             ))}
//           <h1 className="EditReviewHeader">Edit Your Review</h1>
//           <label className="create-review-label">
//             <div className="Review-text-review">Review</div>
//             <div className="create-review-input-container">
//               <textarea
//                 className="create-review-input"
//                 type="string"
//                 placeholder="Write your review..."
//                 value={review}
//                 onChange={(e) => setReview(e.target.value)}
//               />
//             </div>
//           </label>
//           <label className="create-review-label">
//             <div className="starRating-space">Star Rating</div>
//             <div>
//               <input
//                 className="create-star-input"
//                 type="integer"
//                 placeholder="1 - 5"
//                 step="1"
//                 value={stars}
//                 onChange={(e) => setStars(e.target.value)}
//               />
//             </div>
//           </label>
//         </div>
//         <div className="review-submit-container">
//           <button className="create-review-submit-button" type="submit">
//             Submit Review
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default ReviewEditForm;
