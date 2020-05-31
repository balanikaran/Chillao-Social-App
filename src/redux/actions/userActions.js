// Redux action types
import {
    LOADING_UI,
    CLEAR_ERRORS,
    SET_ERRORS,
    LOADING_USER,
    STOP_LOADING_USER,
    SET_USER,
    SET_UNAUTHENTICATED,
} from "../actionTypes";

// axios
import axios from "axios";

// this action generator is called when user tries to signup
export const signUpUser = (userData, history) => (dispatch) => {
    // dispatch an action to show circular progress on the UI
    dispatch({ type: LOADING_UI });
    // hit the backend with the userData to create an account
    // then -> if got a response, save the user token in the local storage
    // using setAuthorizationHeader()
    // dispatch a new action to fetch the new user's data [credentials, likes, notifications]
    // if success clear any errors on UI
    // [This is also by default does work of STOP_LOADING_UI action too, check uiReducer.js for more info]
    // and finally push to home page
    // catch -> dispatch SET_ERRORS to show it on the UI
    axios
        .post("/signup", userData)
        .then((response) => {
            console.log(response);
            setAuthorizationHeader(response.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push("/");
        })
        .catch((err) => {
            console.log(err.response);
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};

// this action generator is called when user tries to login
export const loginUser = (userData, history) => (dispatch) => {
    // dispatch an action to show circular progress on the UI
    dispatch({ type: LOADING_UI });
    // hit the backend with the userData to login
    // then -> if got a response, save the user token in the local storage
    // using setAuthorizationHeader()
    // dispatch a new action to fetch the new user's data [credentials, likes, notifications]
    // if success clear any errors on UI
    // [This is also by default does work of STOP_LOADING_UI action too, check uiReducer.js for more info]
    // and finally push to home page
    // catch -> dispatch SET_ERRORS to show it on the UI
    axios
        .post("/login", userData)
        .then((response) => {
            console.log(response);
            setAuthorizationHeader(response.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push("/");
        })
        .catch((err) => {
            console.log(err.response);
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};

// this action generator simply gets the user's [credentials, likes, notifications]
// using the token of the user
export const getUserData = () => (dispatch) => {
    // set the user status to be loading
    dispatch({ type: LOADING_USER });
    // hit the backend to get the data
    // then -> on success, dispatch new action SET_USER with data as payload to save the data in state
    // catch -> log to console
    axios
        .get("/user")
        .then((response) => {
            dispatch({
                type: SET_USER,
                payload: response.data,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

// this action generator is called when user wants to logout
export const logoutUser = () => (dispatch) => {
    // delete the token from the localstorage
    localStorage.removeItem("firebaseIdToken");
    // remove default header token from the axios
    delete axios.defaults.headers.common["Authorization"];
    // dispatch action to clear REDUX STATE
    dispatch({ type: SET_UNAUTHENTICATED });
};

// this action generator is called when user wants to uplaod new profile image
export const uplaodUserImage = (formData) => (dispatch) => {
    // set the user status to be loading
    dispatch({ type: LOADING_USER });
    // upload profile image from formData to ther server
    axios
        .post("/user/image", formData)
        .then((response) => {
            // success -> refetch the user data with updated profile image url
            dispatch(getUserData());
        })
        .catch((err) => {
            // failed -> log to console, stop user laoding (use previous state)
            console.log(err);
            dispatch({ type: STOP_LOADING_USER });
        });
};

// this action generator is called when when user wants to edit his/her details
export const editUserDetails = (userDetails) => (dispatch) => {
    // set the user laoding status to be loading
    dispatch({ type: LOADING_USER });
    // make server request
    axios
        .post("/user", userDetails)
        .then((response) => {
            // success -> get back new user data wih updated details
            dispatch(getUserData());
        })
        .catch((err) => {
            // failed -> log and stop user laoding (use previous state)
            console.log(err);
            dispatch({ type: STOP_LOADING_USER });
        });
};

// this function is used to store the user token to the local storage
// also appends "Bearer " before the token, because our backend is designed to use such token
const setAuthorizationHeader = (token) => {
    const firebaseIdToken = `Bearer ${token}`;
    // save to local storage
    localStorage.setItem("firebaseIdToken", firebaseIdToken);
    // save in axios header configuration
    axios.defaults.headers.common["Authorization"] = firebaseIdToken;
};
