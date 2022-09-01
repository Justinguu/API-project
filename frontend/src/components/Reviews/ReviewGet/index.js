import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteReviewThunk, getCurrReviewsThunk } from "../../../store/reviews";

const GetSpotReviews = () => {
  const { spotId } = useParams();
  const spotIdParsed = parseInt(spotId);
  // const spot = useSelector((state) => state.spots[spotIdParsed]);

  const allReviews = useSelector((state) => state.reviews);
  const getAllReviewArr = Object.values(allReviews);

  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);


  const dispatch = useDispatch();

  const deleteReview = (e, id) => {
    e.preventDefault();
    dispatch(deleteReviewThunk(id));
  };

  useEffect(() => {
    dispatch(getCurrReviewsThunk(spotId)).then(() => setIsLoaded(true));
  }, [dispatch, spotId]);

  if (!getAllReviewArr.length) {
    return null;
  }

  return (
    isLoaded && (
      <div>
        <h2>Reviews: </h2>
        <ul>
          {getAllReviewArr.map((review) => {
            return (
              <div key={review.id}>
                {review.review}
                {sessionUser.id === review.userId && (
                  <button onClick={(e) => deleteReview(e, review.id)}>
                    DeleteReview
                  </button>
                )}
              </div>
            );
          })}
        </ul>
      </div>
    )
  );
};

export default GetSpotReviews;
