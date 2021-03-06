import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import destinationReducer from './destination'
import locationReducer from './location';
import commentReducer from './comment';
import { externalInforeducer, venueReducer } from "./externalAPI";
import { addGotoReducer } from './gotos';

const rootReducer = combineReducers({
  session,
  destination: destinationReducer,
  location: locationReducer,
  comments: commentReducer,
  externalAPI: externalInforeducer,
  venueAPI: venueReducer,
  gotos: addGotoReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
