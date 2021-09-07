// import {newComment} from './comment'
const EXT_GET = "externalAPI/EXT_GET";
const EXT_VENUE = "externalAPI/EXT_VENUE";

//**********Actions**********//
export const extGet = (payload) => ({
  type: EXT_GET,
  payload,
});

export const extVenue = (payload) => ({
  type: EXT_VENUE,
  payload,
});


//**********THUNKS**********//
export const getExtInfo = (payload) => async (dispatch) => {
  const res = await fetch(`/api/externalAPI/${payload}`);
  if (res.ok) {
      const info = await res.json();
    dispatch(extGet(info));
    return info;
  }
};

export const getExtVenue = (venueType, place) => async (dispatch) => {
  const res = await fetch(`/api/externalAPI/venue/${place}/${venueType}`)
  if (res.ok) {
    const venue = await res.json();
    dispatch(extVenue(venue));
    return venue;
  }
};

const initialState = {};

export const externalInforeducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case EXT_GET:
          newState = {...action.payload};
      return {
        ...newState,
      };
    default:
      return state;
  }
};

export const venueReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case EXT_VENUE:
      newState = [ ...action?.payload?.response?.groups[0].items ];
      return {
        ...newState,
      };
    default:
      return state;
  }
}
// export default externalInforeducer;
