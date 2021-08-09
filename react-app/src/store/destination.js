// import {newComment} from './comment'
export const DEST_FEED = "destination/DEST_FEED";
const POST_FEED = "destination/POST_FEED";
const DELETE_POST = "destination/DELETE_POST";
const UPDATE_FEED = "destination/UPDATE_FEED";

//**********Actions**********//
export const postFeed = (payload) => ({
  type: POST_FEED,
  payload,
});

export const updateFeed = (payload) => ({
  type: UPDATE_FEED,
  payload
})

export const destFeed = (payload) => ({
  type: DEST_FEED,
  payload,
});

export const deleteFeed = (payload) => ({
  type: DELETE_POST,
  payload,
});

//**********THUNKS**********//
export const getDestExternal = (payload) => async (dispatch) => {
  const response = await fetch(`/api/destination/external`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  dispatch(destFeed(data));
};


export const getDestFeed = (payload) => async (dispatch) => {
  const res = await fetch(`/api/cities/${payload}`);
  if (res.ok) {
    const dest = await res.json();
    dispatch(destFeed(dest));
    return dest;
  }
};

export const postDestFeed = (payload) => async (dispatch) => {
  const res = await fetch(`/api/cities/${payload.loc_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const newFeed = await res.json();
  dispatch(postFeed(newFeed));
};

export const updateDestFeed = (id, body) => async (dispatch) => {
  const res = await fetch(`/api/cities/${id}/${body}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (res.ok) {
    const updatePost = await res.json();
    dispatch(updateFeed(updatePost));
  }
};

export const deleteDestPost = (id) => async (dispatch) => {
  const res = await fetch(`/api/cities/${id}`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
  if (res.ok) {
    await res.json();
    dispatch(deleteFeed(id));
    return res;
  }
};

const initialState = {  };

const destinationReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case DEST_FEED:
      action.payload.feeds.forEach((loc) => {
        newState[loc.id] = loc;
      });
      return {
        // ...state,
        ...newState,
      };
    case UPDATE_FEED:
    case POST_FEED:
      newState = {
        ...state,
        [action.payload.id]: action.payload,
      };
      return newState;
    case DELETE_POST:
      newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default destinationReducer;
