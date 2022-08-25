import { csrfFetch } from "./csrf";

const LOADSPOTREVIEWS = "reviews/LOADSPOTREVIEWS";
const CREATEREVIEW = "reviews/CREATEREVIEW";
const DELETEREVIEW = "reviews/DELETEREVIEW";

const getSpotReviews = (reviews) => ({
  type: LOADSPOTREVIEWS,
  reviews,
});

const createReview = (review) => ({
  type: CREATEREVIEW,
  review,
});

const deleteReview = (id) => ({
  type: DELETEREVIEW,
  id,
});


//thunks
export const getCurrReviewsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/spots/${spotId}`);

  if (response.ok) {
    const reviews = await response.json();
    dispatch(getSpotReviews(reviews));
    return reviews;
  }
};

export const createReviewThunk = (review) => async (dispatch) => {
  const response = await csrfFetch('/api/reviews/spots', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createReview(data));
    return data;
  }
};

export const deleteReviewThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteReview(id));
    return data;
  }
};



const reviewReducer = (state = {}, action) => {
    let newState
    switch (action.type) {
    
        case LOADSPOTREVIEWS: 
    newState = {...state }
      action.reviews.forEach(review => {
        newState[review.id] = review
      })
      return newState
        case CREATEREVIEW: 
    newState = {...state}
    newState[action.spot.id] = action.spot
    return newState
        case DELETEREVIEW: {
        newState = {...state}
        delete newState[action.id]
        return newState
    }
    default:
      return state
  }
};

export default reviewReducer;