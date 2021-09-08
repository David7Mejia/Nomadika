const ADD_VENUE = 'gotos/ADD_VENUE';
const GET_VENUE = 'gotos/GET_VENUE';
//**********Actions**********//
export const addVenue = (payload) => ({
  type: ADD_VENUE,
  payload,
});

export const getVenue = (payload) => ({
    type: GET_VENUE,
    payload,
})


//**********THUNKS**********//
export const addVenueThunk = (payload) => async (dispatch) => {
    console.log('addVenueThunk payload: ', payload);
    const res = await fetch(`/api/goto/${payload.loc_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (res.ok){
        const json = await res.json();
        console.log('addVenueThunk json: ', json);
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
            console.log('getGotoVenueThunk action.payload: ', action.payload);
            newState = {

                ...action.payload,
            };
            return newState;
        default:
            return state;
    }

}
