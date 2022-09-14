import { csrfFetch } from "./csrf";

//DEFINE TYPES
const READ = "/spots/read";
const GETSPOTINFO = "/spots/getspotinfo";
const CREATE = "/spots/create";
const UPDATE = "/spots/update";
const DELETE = "/spots/delete";

// ACTION CREATORS
export const GetAllTheSpots = (spots) => {
  return {
    type: READ,
    spots,
  };
};
export const getCurrentSpot = (spot) => {
  return {
    type: GETSPOTINFO,
    spot,
  };
};
export const createTheSpot = (payload) => {
  return {
    type: CREATE,
    payload,
  };
};
export const updateTheSpot = (spot) => {
  return {
    type: UPDATE,
    spot,
  };
};
export const deleteTheSpot = (id) => {
  return {
    type: DELETE,
    id,
  };
};

// THUNKS

export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");

  if (response.ok) {
    const spots = await response.json();
    dispatch(GetAllTheSpots(spots.allSpots));
    return response;
  }
  return response;
};

export const getCurrSpotThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(getCurrentSpot(spot));

    return spot;
  }
};

export const createSpotThunk = (payload) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const data = await response.json();
    const imageResponse = await csrfFetch(`/api/spots/${data.id}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: payload.url,
        previewImage: payload.previewImage,
      }),
    });
    if (imageResponse.ok) {
      const imageData = await imageResponse.json();
      data.previewImage = imageData.url;
      dispatch(createSpotThunk(data));
    }
  }
};

// export const updateSpotThunk = (payload) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots/auth/${payload.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   });
//   if (response.ok) {
//     const data = await response.json();
//     const imageResponse = await csrfFetch(`/api/spots/${data.id}/images `, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         url: payload.url,
//         previewImage: payload.previewImage,
//       }),
//     })
//     if(imageResponse.ok){
//         const imageData = await imageResponse.json()
//         data.previewImage = imageData.url
//          dispatch(updateSpotThunk(data));
//          return imageData

//     }
//   }
// };
export const updateSpotThunk = (spotId, payload) => async(dispatch) => {
  const response = await csrfFetch((`/api/spots/${spotId}`), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const data = await response.json()
    dispatch(updateTheSpot(data))
    return response
  }
}





export const deleteSpotThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`api/spots/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = response.json();
    dispatch(deleteTheSpot(id));
    return data;
  }
};

const spotsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case READ:
      newState = { ...state };
      action.spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    case GETSPOTINFO:
      newState = { ...state };
      newState[action.spot.id] = action.spot;
      return newState;
    case CREATE:
      newState = { ...state };
      newState[action.spot.id] = action.spot;
      return newState;
    case UPDATE:
      newState = { ...state };
      newState[action.spot.id] = action.spot;
      return newState;
    case DELETE:
      newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
