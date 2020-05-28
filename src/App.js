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

// axios
import axios from "axios";
// axios.defaults.baseURL = "https://us-central1-jasap-kb.cloudfunctions.net/api";

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/login" component={Login} />
                            <Route path="/signup" component={Signup} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
