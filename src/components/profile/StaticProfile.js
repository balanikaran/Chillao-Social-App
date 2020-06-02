import React from "react";

import { Link } from "react-router-dom";

// Material UI
import { Paper, makeStyles, Typography } from "@material-ui/core";
import MuiLink from "@material-ui/core/Link";

// Material UI Icons
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

// This is a standalone component which shows any users profile info
// on the left, this is a public page... [/users/{username}] page
const StaticProfile = (props) => {
    // we get back the processed theme object back in 'classes' object
    const classes = useStyles();

    // destructuring userProfileData from props
    // userProfileData contains {username, imageUrl, bio, location, createdAt, etc...}
    const { userProfileData } = props;

    // creating profileContent markup
    // if user is loading -> show skeleton
    // if user is loaded -> show profile component
    let profileContent =
        userProfileData !== null ? (
            <Paper variant="outlined" className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img
                            src={userProfileData.imageUrl}
                            alt="profile"
                            className="profile-image"
                        />
                    </div>
                    <hr />
                    <div className="profile-details">
                        <MuiLink
                            component={Link}
                            to={`/users/${userProfileData.username}`}
                            color="primary"
                            variant="h6"
                        >
                            @{userProfileData.username}
                        </MuiLink>
                        <hr />
                        {userProfileData.bio && (
                            <Typography variant="body1">
                                {userProfileData.bio}
                            </Typography>
                        )}
                        <hr />
                        {userProfileData.website && (
                            <>
                                <LinkIcon />
                                <a
                                    href={userProfileData.website}
                                    target="__blank"
                                    rel="noopener noreferrar"
                                >{`  ${userProfileData.website}`}</a>
                                <hr />
                            </>
                        )}
                        {userProfileData.location && (
                            <>
                                <LocationIcon />{" "}
                                <span>{`  ${userProfileData.location}`}</span>
                            </>
                        )}
                        <hr />
                        {userProfileData.createdAt && (
                            <>
                                <CalendarIcon />
                                <span>
                                    {`  Joined `}
                                    {dayjs(userProfileData.createdAt).format(
                                        "MMM YYYY"
                                    )}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </Paper>
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

export default StaticProfile;
