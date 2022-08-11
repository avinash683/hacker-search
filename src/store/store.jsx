import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import configs from "./reducers/configs";
import thunk from 'redux-thunk';
const composeEnhancers =  compose;
const rootReducer = combineReducers({
 configs
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export default store;