import React, { useState } from "react";

import { Link } from "react-router-dom";

// Material UI
import {
    Typography,
    Grid,
    makeStyles,
    TextField,
    Button,
    CircularProgress,
} from "@material-ui/core";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Redux actions
import { loginUser } from "../redux/actions/userActions";

// images
import AppLogo from "../images/logo.png";

// these are the styles for different elements
// we are using in this particular component
const useStyles = makeStyles((theme) => ({
    logo: {
        maxWidth: 120,
    },
    form: {
        textAlign: "center",
    },
    heading: {
        marginBottom: 30,
    },
    textField: {
        margin: "10px auto 10px auto",
    },
    generalError: {
        color: "red",
        margin: "10px auto 10px auto",
    },
    button: {
        margin: 10,
        position: "relative",
    },
}));

const Login = (props) => {
    // we get the processed theme styles in 'classes' object
    const classes = useStyles();

    // because this is a functional component
    // we are using hooks to define state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // user object is data from userReducer
    const user = useSelector((state) => state.user);
    // isLoading and errors is the object from uiReducer
    // from which we are extracting both the objects
    // --------------
    // isLoading is true when the request is sent back to server and we are waiting for the response
    // FOR instance when we click on LOGIN button
    // isLoading is set to true
    // when the token/error is returned isLoading is set to false
    // --------------
    // errors object contains errors based on the input
    // email/password/general
    const { isLoadingUI, errors } = useSelector((state) => state.ui);

    // to call action generators (REDUX)
    const dispatch = useDispatch();

    // this function is invoked when the submit(login) button
    // is clicked, we'll add more here
    const handleSubmit = (event) => {
        // to prevent redirecting/reloadding page when submit
        event.preventDefault();
        // creating userData object to send back to server
        const userData = {
            email,
            password,
        };
        // destructuring history object from props
        // this is used to move to new page programatically
        const { history } = props;
        // we call the loginUser with userData and history prop
        dispatch(loginUser(userData, history));
    };

    return (
        <Grid container>
            <Grid item sm />
            <Grid item sm className={classes.form}>
                <img src={AppLogo} alt="app_logo" className={classes.logo} />
                <Typography variant="h4" className={classes.heading}>
                    Login Form
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        className={classes.textField}
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        helperText={errors && errors.email}
                        error={errors && errors.email ? true : false}
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        fullWidth
                    />
                    <TextField
                        variant="outlined"
                        className={classes.textField}
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        helperText={errors && errors.password}
                        error={errors && errors.password ? true : false}
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        fullWidth
                    />
                    {
                        // this block is for general errors
                        errors && errors.general && (
                            <Typography
                                variant="body1"
                                className={classes.generalError}
                            >
                                {errors.general}
                            </Typography>
                        )
                    }
                    <br />
                    {isLoadingUI && (
                        <CircularProgress size={30} color="secondary" />
                    )}
                    <br />
                    <Button
                        type="submit"
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        disabled={isLoadingUI}
                    >
                        Login
                    </Button>
                    <br />
                    <small>
                        Don't have an account? Sign Up{" "}
                        <Link to="/signup">HERE</Link>
                    </small>
                </form>
            </Grid>
            <Grid item sm />
        </Grid>
    );
};

export default Login;
