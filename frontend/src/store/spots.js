import { csrfFetch } from "./csrf";

//DEFINE TYPES
const READ = "/spots/read";
const GETSPOTINFO = "/spots/getspotinfo";
const CREATE = "/spots/create";
const UPDATE = "/spots/update";
const DELETE = "/spots/delete";

const UPDATEIMAGE = "/spots/updateImage";

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
export const createTheSpot = (spot) => {
  return {
    type: CREATE,
    spot,
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

// export const updateImage = (image, spotId) => {
//   return {
//     type: UPDATEIMAGE,
//     image,
//     spotId,
//   };
// };

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

export const createSpotThunk = (spot) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot)
  }).catch(async (e) => {
    const errorMessage = await e.json() //catch error if 500 is thrown  ==> use in the future => .catch(async (e) => {const errorMessage = await e.json() console.log('error message---- spot store', errorMessage)
    console.log('error message---- spot store', errorMessage)
    throw errorMessage
  })
  
  if (response.ok) {
    const data = await response.json()
    const imageResponse = await csrfFetch(`/api/spots/${data.id}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: spot.url,
        previewImage: spot.previewImage,
      }),
    });
    if (imageResponse.ok) {
      const imageData = await imageResponse.json();
      data.previewImage = imageData.url;
      dispatch(createTheSpot(data));
    }
  }
};

export const updateSpotThunk = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  let imageResponse;

  let spot;
  if (response.ok) {
    spot = await response.json();
    imageResponse = await csrfFetch(`/api/images/${payload.imageId} `, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  }
  let responseUpdate;
  if (imageResponse.ok) {
    responseUpdate = await csrfFetch(`/api/spots/${payload.id}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: payload.url,
        previewImage: true,
      }),
    });
  }
  let updateData;
  if (responseUpdate.ok) {
    updateData = await responseUpdate.json();
    payload.previewImage = updateData;
    spot.Images = [updateData]
    dispatch(updateTheSpot(spot))
      // dispatch(updateImage(updateData, payload.id))
  }
};

// export const updateSpotThunk = (spotId, payload) => async(dispatch) => {
//   const response = await csrfFetch((`/api/spots/${spotId}`), {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });
//   if (response.ok) {
//     const data = await response.json()
//     dispatch(updateTheSpot(data))
//     return response
//   }
// }

export const deleteSpotThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "DELETE",
  })

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

    case UPDATEIMAGE: {
      newState = { ...state };
      newState[action.spotId].Images = [action.image];
      return newState;
    }

    case DELETE:
      newState = { ...state };
      delete newState[action.id];
      return newState;
      
    default:
      return state;
  }
};

export default spotsReducer;
