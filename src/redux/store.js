import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";

// reducers
import userReducer from "./reducers/userReducer";
import uiReducer from "./reducers/uiReducer";

const initialState = {};

const middleWare = [thunk];

const reducers = combineReducers({
    user: userReducer,
    ui: uiReducer,
});

const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancers = composeEnhancers(applyMiddleware(...middleWare));

const store = createStore(reducers, initialState, enhancers);

export default store;
