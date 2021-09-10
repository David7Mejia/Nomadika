const ADD_VENUE = 'gotos/ADD_VENUE';
const GET_VENUE = 'gotos/GET_VENUE';
const DELETE_VENUE = 'gotos/DELETE_VENUE';

//**********Actions**********//
export const addVenue = (payload) => ({
  type: ADD_VENUE,
  payload,
});

export const getVenue = (payload) => ({
    type: GET_VENUE,
    payload,
})

export const deleteVenue = (payload) => ({
    type: DELETE_VENUE,
    payload,
})

//**********THUNKS**********//
export const addVenueThunk = (payload) => async (dispatch) => {
    const res = await fetch(`/api/goto/${payload.loc_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (res.ok){
        const json = await res.json();
        dispatch(addVenue(json));
    }
}

export const getGotoVenueThunk = (payload) => async (dispatch) => {
    const res = await fetch(`/api/goto/${payload}`);

    if (res.ok) {
        const json = await res.json();
        dispatch(getVenue(json));
    }
}

export const deleteGotoVenueThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/goto/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ id })
    });
    if (res.ok) {
        await res.json();
        dispatch(deleteVenue(id));

    }
}

export const getUserVenuesThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/goto/user/${id}`);

    if (res.ok) {
        const json = await res.json();
        dispatch(getVenue(json));
    }
}

const initialState = {};

export const addGotoReducer = (state = initialState, action) => {
    let newState = {};

    switch (action.type) {
        case ADD_VENUE:
            newState = {
                ...state,
                ...action.payload,
            };
            return newState;
        case GET_VENUE:
            newState = {
                ...action.payload,
            };
            return newState;
        case DELETE_VENUE:
            newState = { ...state }
            delete newState[action.id]
            return newState;
        default:
            return state;
    }

}
