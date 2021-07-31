const DEST_FEED = "destination/DEST_FEED";
const POST_FEED = "destination/POST_FEED";

export const postFeed = (payload) => ({
  type: POST_FEED,
  payload,
})

export const destFeed = (payload) => ({
  type: DEST_FEED,
  payload,
});

export const getDestFeed = (payload) => async (dispatch) => {
  console.log("getDestFeed", payload);
  const res = await fetch(`/api/cities/${payload}`);
  if (res.ok) {
    const dest = await res.json();
    dispatch(destFeed(dest));
    return dest;
  }
};

// export const postDestFeed = (payload) => async (dispatch) => {

// }


const initialState = { thing: "" };

const destinationReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case DEST_FEED:
      [action.payload].forEach((loc) => {
        newState[loc.id] = loc;
      });
      return {
        ...newState,
      };
    default:
      return state;
  }
};

export default destinationReducer;
