import { csrfFetch } from "./csrf";

//DEFINE TYPES
const READ = '/spots/read'
const CREATE = '/spots/create'
const UPDATE = '/spots/update'
const DELETE = '/spots/delete'


// ACTION CREATORS
export const GetAllTheSpots = (spots) => {
    return {
        type: READ,
        spots,
    };
};
export const createTheSpot = (spot) => {
    return {
        type: CREATE,
        spot
    };
};
export const updateTheSpot = (spot) => {
    return {
        type: UPDATE,
        spot
    };
};
export const deleteTheSpot = (id) => {
    return {
        type: DELETE,
        id
    };
};


// THUNKS


export const getAllSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')

    if (response.ok) {
        const spots = await response.json();
        dispatch(GetAllTheSpots(spots.allSpots))
        return response
    }
    return response
};

export const CreateSpotThunk = payload => async dispatch => {
    const response = await csrfFetch(`/api/currentUser/spots`, {
        method: 'POST',
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(createTheSpot(data))
        return data.id
    } else throw response
};

export const updateSpotThunk = payload => async dispatch => {
    const response = await csrfFetch(`/api/currentUser/spots/${payload.id}`, {
        method: 'PUT',
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json()
        return dispatch(updateTheSpot(data))
    };
};

export const DeleteSpotThunk = id => async dispatch => {
    const response = await csrfFetch(`/api/currentUser/spots/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const data = response.json()
        dispatch(deleteTheSpot(id))
        return data
    } else throw response
}



const spotsReducer = (state = {}, action)  => {

    
    switch(action.type) {
        case READ:
            let newState = { ...state }
            action.spots.forEach(spot => { 
              newState[spot.id] = spot
            })
            return newState
        // case DELETE:
        //     newState = {...state}
        //     delete newState[action.id]
        //     return newState
        // case UPDATE:
        //     newState = {...state}
        //     newState[action.spot.id] = action.spot
        //     return newState
        // case CREATE:
        //     newState = {...state}
        //     newState[action.spot.id] = action.spot
        //     return newState
        default:
            return state
    }
}

export default spotsReducer
