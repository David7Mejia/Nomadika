const DEST_FEED = "destination/DEST_FEED";

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
  console.log("*************THIS IS RES", res);
};

const initialState = { thing: "" };

const destinationReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case DEST_FEED:
      [action.payload].forEach((loc) => {
        console.log("reduuuuuuuuuuucer", loc, action.payload);
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
