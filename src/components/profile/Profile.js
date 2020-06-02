import React, { createRef } from "react";

import { Link } from "react-router-dom";

// components
import EditDetailsDialog from "./EditDetailsDialog";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Redux action generators
import { uplaodUserImage, logoutUser } from "../../redux/actions/userActions";

// Material UI
import {
    Paper,
    makeStyles,
    IconButton,
    Tooltip,
    Typography,
    Button,
} from "@material-ui/core";
import MuiLink from "@material-ui/core/Link";

// Material UI Icons
import EditIcon from "@material-ui/icons/Edit";
import LinkIcon from "@material-ui/icons/Link";
import LocationIcon from "@material-ui/icons/LocationOn";
import CalendarIcon from "@material-ui/icons/CalendarToday";

// Material UI Lab
import Skeleton from "@material-ui/lab/Skeleton";

// dayjs for formatting timedate string
import dayjs from "dayjs";

// this is the styles object combined with the Material UI base theme
// to be applied on the components defined below
const useStyles = makeStyles((theme) => ({
    paper: {
        padding: 20,
    },
    profile: {
        "& .image-wrapper": {
            textAlign: "center",
            position: "relative",
            "& button": {
                position: "absolute",
                top: "80%",
                left: "70%",
            },
        },
        "& .profile-image": {
            width: 200,
            height: 200,
            objectFit: "cover",
            maxWidth: "100%",
            borderRadius: "50%",
            borderWidth: 25,
        },
        "& .profile-details": {
            textAlign: "left",
            "& span, svg": {
                verticalAlign: "middle",
            },
        },
        "& hr": {
            border: "none",
            margin: "0 0 10px 0",
        },
        "& svg.button": {
            "&:hover": {
                cursor: "pointer",
            },
        },
    },
    buttons: {
        textAlign: "center",
        "& a": {
            margin: "20px 10px",
        },
    },
}));

const Profile = (props) => {
    // we get back the processed theme object back in 'classes' object
    const classes = useStyles();

    // this is used to call action generators (REDUX)
    const dispatch = useDispatch();

    // destructuring credentials array, isLoadingUser and isAuthenticated from REDUX STATE
    const { credentials, isLoadingUser, isAuthenticated } = useSelector(
        (state) => state.user
    );

    // creating a ref for <input> file tag
    // which is hidden -> but is javascript-ly clicked when user clicks
    // on pen icon [EditButton]
    // NOTE: why ref?
    // because document.getElementById() is not suggested to use here.
    const imageInputRef = createRef();

    // this function is called javascript-ly when user clicks on
    // EditButton...
    const handleImageEditInput = (event) => {
        // getting image from the <input> tag
        const image = event.target.files[0];
        // creating a new FormData to store image and name
        const formData = new FormData();
        // adding image and name to FormData
        formData.append("image", image, image.name);
        // call upload action generator
        dispatch(uplaodUserImage(formData));
    };

    // to click <input> file js-ly
    const handleEditButtonClick = () => {
        const hiddenFileInput = imageInputRef.current;
        hiddenFileInput.click();
    };

    // this fucntion is called when user wants to logout
    const handleLogout = () => {
        dispatch(logoutUser());
    };

    // creating profileContent markup
    // if user is loading -> show skeleton
    // else if user is authenticated -> show profile component
    // else -> show login/signup buttons
    let profileContent = !isLoadingUser ? (
        isAuthenticated ? (
            <Paper variant="outlined" className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img
                            src={credentials.imageUrl}
                            alt="profile"
                            className="profile-image"
                        />
                        <input
                            type="file"
                            ref={imageInputRef}
                            hidden="hidden"
                            onChange={handleImageEditInput}
                        />
                        <Tooltip title="Edit Profile Pic" placement="right">
                            <IconButton
                                className="button"
                                onClick={handleEditButtonClick}
                            >
                                <EditIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <hr />
                    <div className="profile-details">
                        <MuiLink
                            component={Link}
                            to={`/users/${credentials.username}`}
                            color="primary"
                            variant="h6"
                        >
                            @{credentials.username}
                        </MuiLink>
                        <hr />
                        {credentials.bio && (
                            <Typography variant="body1">
                                {credentials.bio}
                            </Typography>
                        )}
                        <hr />
                        {credentials.website && (
                            <>
                                <LinkIcon />
                                <a
                                    href={credentials.website}
                                    target="__blank"
                                    rel="noopener noreferrar"
                                >{`  ${credentials.website}`}</a>
                                <hr />
                            </>
                        )}
                        {credentials.location && (
                            <>
                                <LocationIcon />{" "}
                                <span>{`  ${credentials.location}`}</span>
                            </>
                        )}
                        <hr />
                        {credentials.createdAt && (
                            <>
                                <CalendarIcon />
                                <span>
                                    {`  Joined `}
                                    {dayjs(credentials.createdAt).format(
                                        "MMM YYYY"
                                    )}
                                </span>
                            </>
                        )}
                        <hr />
                        <EditDetailsDialog />
                        <hr />
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </Paper>
        ) : (
            <Paper variant="outlined" className={classes.paper}>
                <Typography variant="h5">
                    You're not currently logged in!
                </Typography>
                <Typography>
                    In this mode you cannot like/comment on the posts.
                </Typography>
                <div className={classes.buttons}>
                    <Button
                        variant="outlined"
                        color="primary"
                        component={Link}
                        to="/login"
                    >
                        Login
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        component={Link}
                        to="/signup"
                    >
                        Signup
                    </Button>
                </div>
            </Paper>
        )
    ) : (
        <Paper variant="outlined" className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <div className="profile-image">
                        <Skeleton
                            animation="wave"
                            variant="rect"
                            width={200}
                            height={200}
                        />
                    </div>
                </div>
                <hr />
                <div className="profile-details">
                    <Skeleton animation="wave" variant="text" />
                    <hr />
                    <Skeleton animation="wave" variant="text" />
                    <hr />
                    <Skeleton animation="wave" variant="text" />
                    <hr />
                    <Skeleton animation="wave" variant="text" />
                    <hr />
                    <Skeleton animation="wave" variant="text" />
                </div>
            </div>
        </Paper>
    );

    // render...
    return profileContent;
};

export default Profile;
