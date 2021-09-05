// import {newComment} from './comment'
const EXT_GET = "destination/DEST_FEED";


//**********Actions**********//
export const extGet = (payload) => ({
  type: EXT_GET,
  payload,
});


//**********THUNKS**********//
export const getExtInfo = (payload) => async (dispatch) => {
    console.log('payload', payload);
    const res = await fetch(`/api/externalAPI/${payload}`);
    console.log('res', res);
  if (res.ok) {
      const info = await res.json();
      console.log('info', info);
    dispatch(extGet(info));
    return info;
  }
};


const initialState = {};

const externalInforeducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
      case EXT_GET:
          console.log('action.payload', action.payload);
          newState = {...state, ...action.payload};
      return {
        // ...state,
        ...newState,
      };
    default:
      return state;
  }
};

export default externalInforeducer;
