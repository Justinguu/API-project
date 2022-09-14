import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteReviewThunk, getCurrReviewsThunk } from "../../../store/reviews";
import icon from "../../Navigation/Images/icon.svg";
import "./reviewGet.css";

const GetSpotReviews = () => {
  const { spotId } = useParams();
  // const spotIdParsed = parseInt(spotId);
  // const spot = useSelector((state) => state.spots[spotIdParsed]);

  const allReviews = useSelector((state) => Object.values(state.reviews))
  const getAllReviewArr = allReviews.filter((review) => review.spotId === parseInt(spotId))
  // const getAllReviewArr = Object.values(allReviews);

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

  // if (getAllReviewArr.length) {
  //   return null;
  // }

  return (
    isLoaded && (
      <div>
        <ul className="review-border">
          {Object.values(getAllReviewArr).map((review) => {
            return (
              <div className="review-box" key={review.id}>
                <div
                  className="reviewe-box"
                  style={{ fontSize: "16px", fontWeight: "800px" }}
                >
                  <div>
                    <img className="review-icon" src={icon} alt="" />
                  </div>{" "}
                  &nbsp;&nbsp;{review.User.firstName}
                </div>
                <div>
                  {review.review} &nbsp; &nbsp;
                 
                  {!sessionUser ? null : sessionUser.id === review.userId && (  // even if not session user still be able to access spots

                    <button
                      className="deleteButton"
                      onClick={(e) => deleteReview(e, review.id)}
                    >
                      DeleteReview
                    </button>
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
