import React from "react";

import { Link } from "react-router-dom";

// Material UI
import {
    AppBar,
    makeStyles,
    Toolbar,
    Typography,
    Button,
} from "@material-ui/core";

// images
import AppLogo from "../../images/logo.png";

// redux
import { connect } from "react-redux";

// this is the styles object combined with the Material UI base theme
// to be applied on the components defined below
const useStyles = makeStyles((theme) => ({
    logo: {
        maxWidth: 50,
        margin: "10px 10px 10px 30px",
    },
    title: {
        flexGrow: 1,
    },
}));

const Navbar = (props) => {
    // we get back the processed theme object back in 'classes' object
    const classes = useStyles();
    console.log(props);
    const { isAuthenticated } = props;

    return (
        <AppBar elevation={0} color="transparent">
            <Toolbar>
                <Link to="/">
                    <img
                        src={AppLogo}
                        alt="app_logo"
                        className={classes.logo}
                    />
                </Link>
                <Typography
                    color="inherit"
                    variant="h6"
                    className={classes.title}
                >
                    Chillao - Just Another Social App Project
                </Typography>
                {isAuthenticated ? (
                    <>
                        <Button color="inherit" component={Link} to="/">
                            Notifications
                        </Button>
                    </>
                ) : (
                    <>
                        {/* <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to="/signup">
                            Signup
                        </Button> */}
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

// this function is used to map 'state' object to props
// we only extract the useful information from the state
// ----------- NOTE -----------
// here we only need the authenticated state {true/false}
// so we only extract it and pass it to the props
const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
});

// connect is an HOC used to connect the component with the
// global REDUX STORE
export default connect(mapStateToProps)(Navbar);
