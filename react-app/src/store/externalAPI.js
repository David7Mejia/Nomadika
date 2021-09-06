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
  console.log('PLACE AND VENUE TYPE:', venueType, place);
  const res = await fetch(`/api/externalAPI/venue/${place}/${venueType}`)
  if (res.ok) {
    const venue = await res.json();
    dispatch(extVenue(venue));
    return venue;
  }
};

const initialState = {};

const externalInforeducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case EXT_GET:
      console.log('LOCATION GET INFO')
          newState = {...action.payload};
      return {
        ...newState,
      };
    case EXT_VENUE:
      newState = { ...state, ...action.payload };
      return {
        ...newState,
      };
    default:
      return state;
  }
};

export default externalInforeducer;
