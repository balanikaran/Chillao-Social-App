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

// Redux Actions Generators
import { signUpUser } from "../redux/actions/userActions";

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

const Signup = (props) => {
    // we get the processed theme styles in 'classes' object
    const classes = useStyles();

    // because this is a functional component
    // we are using hooks to define state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");

    // user object is data from userReducer
    const user = useSelector((state) => state.user);
    // isLoading and errors is the object from uiReducer
    // from which we are extracting both the objects
    // --------------
    // isLoading is true when the request is sent back to server and we are waiting for the response
    // FOR instance when we click on SIGNUP button
    // isLoading is set to true
    // when the token/error is returned isLoading is set to false
    // --------------
    // errors object contains errors based on the input
    // email/password/confirmPassword/username/general
    const { isLoadingUI, errors } = useSelector((state) => state.ui);

    // dispatch is used to call actions
    const dispatch = useDispatch();

    // here we are checking if the user is already authenticated or not
    // if yes -> user is redirected back to home (no point of getting to the signup page)
    if (user.isAuthenticated) {
        props.history.push("/");
    }

    // this function is invoked when the submit(login) button
    // is clicked, we'll add more here
    const handleSubmit = (event) => {
        // this is to prevent the default changing page behaviour when form is submitted
        event.preventDefault();

        // defining the new user object to be sent to the backend
        // to create a new account
        const userData = {
            email,
            password,
            confirmPassword,
            username,
        };

        // destructuring/extracting 'history' from props
        const { history } = props;

        // console.log(userData);

        // this is the redux hooks way of calling an action using dispatch
        dispatch(signUpUser(userData, history));
    };

    return (
        <Grid container>
            <Grid item sm />
            <Grid item sm className={classes.form}>
                <img src={AppLogo} alt="app_logo" className={classes.logo} />
                <Typography variant="h4" className={classes.heading}>
                    Sign Up Form
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
                    <TextField
                        variant="outlined"
                        className={classes.textField}
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        helperText={errors && errors.confirmPassword}
                        error={errors && errors.confirmPassword ? true : false}
                        value={confirmPassword}
                        onChange={(event) => {
                            setConfirmPassword(event.target.value);
                        }}
                        fullWidth
                    />
                    <TextField
                        variant="outlined"
                        className={classes.textField}
                        id="username"
                        name="username"
                        type="text"
                        label="Username"
                        helperText={errors && errors.username}
                        error={errors && errors.username ? true : false}
                        value={username}
                        onChange={(event) => {
                            setUsername(event.target.value);
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
                        Signup
                    </Button>
                    <br />
                    <small>
                        Already have an account? Login{" "}
                        <Link to="/login">HERE</Link>
                    </small>
                </form>
            </Grid>
            <Grid item sm />
        </Grid>
    );
};

export default Signup;
