import React from "react";
import "./App.css";

// components
import Navbar from "./components/layout/Navbar";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// React router
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Redux
import store from "./redux/store";
import { Provider } from "react-redux";

// Redux action generators
import { getUserData, logoutUser } from "./redux/actions/userActions";

// Redux action types
import { SET_AUTHENTICATED } from "./redux/actionTypes";

// jwt-decode for checking validity of firebase token
import jwtDecode from "jwt-decode";

// axios
import axios from "axios";
// axios.defaults.baseURL = "https://us-central1-jasap-kb.cloudfunctions.net/api";

// check if the user is authenticated and token is valid
// get token from local storage
const token = localStorage.firebaseIdToken;
if (token) {
    // token found
    console.log("validating token");
    // decode token
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        // token is invalid
        // logout -> to set REDUX STORE STATE back to empty
        store.dispatch(logoutUser());
        // move to login page
        window.location.href = "/login";
    } else {
        // token is valid
        // set user isAuthenticated as TRUE in REDUX STATE
        store.dispatch({ type: SET_AUTHENTICATED });
        // set axios default header for AUTHORIZATION
        axios.defaults.headers.common["Authorization"] = token;
        // fetch user data to show to home page
        store.dispatch(getUserData());
    }
}

/*
    ---------- NOTE FOR THE ABOVE CODE ---------- 
    A very inresting thing to catch which many people don't get.

    If we do not remove the auth token from the storage, the application
    goes into an infinite loop, and the application keeps reloading login page
    -> here the token is removed from the local storage in the `logoutUser()`
    ----------------------------------------------
*/

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Navbar />
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
