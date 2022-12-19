import { csrfFetch } from "./csrf";

const LOADSPOTREVIEWS = "reviews/LOADSPOTREVIEWS";
const CREATEREVIEW = "reviews/CREATEREVIEW";
const UPDATEREVIEW = "reviews/UPDATEREVIEW";
const DELETEREVIEW = "reviews/DELETEREVIEW";


const getSpotReviews = (reviews) => ({
  type: LOADSPOTREVIEWS,
  reviews
});

const createReview = (review) => ({
  type: CREATEREVIEW,
  review
});

const editReview = (reviewId) => ({
  type: UPDATEREVIEW,
  reviewId
});

const deleteReview = (id) => ({
  type: DELETEREVIEW,
  id
});


//thunks
export const getCurrReviewsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(getSpotReviews(reviews));
  }
  return response
};

export const createReviewThunk = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${review.spotId}/reviews`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(review)
    });
  
    if (response.ok) {
      const spotReview = await response.json();
     return dispatch(createReview(spotReview));
    }
    return response;
  };

  export const updateReviewThunk = (reviewId) => async (dispatch) => {
const response = await csrfFetch(`/api/reviews/${reviewId}`, {
  method: "PUT",
  headers:{
    "Content-Type": "application/json"
  },
  body: JSON.stringify(reviewId)
});
if (response.ok) {
  const data = await response.json();
  return dispatch(editReview(data));
}
return response;
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteReview(reviewId));
   return "review deleted"
  }
  
};



const reviewReducer = (state = {}, action) => {
    let newState
    switch (action.type) {
    
        case LOADSPOTREVIEWS: 
    newState = {} 
      action.reviews.forEach(review => {
        newState[review.id] = review
      })
    
      return newState
      
        case CREATEREVIEW: 
    newState = {...state}
    newState[action.review.id] = action.review
    return newState

        case DELETEREVIEW: {
        newState = {...state}
        delete newState[action.id]  // check later if it works without it to see if it works 
        return newState
    }
    default:
      return state
  }
};

export default reviewReducer;