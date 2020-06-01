import React, { useEffect, useState } from "react";

// components
import StaticProfile from "../components/profile/StaticProfile";
import Post from "../components/post/Post";

// redux
import { useSelector, useDispatch } from "react-redux";

// redux actions
import { getUserPosts } from "../redux/actions/dataActions";

// Material UI
import { makeStyles, Paper, Grid } from "@material-ui/core";

// axios
import axios from "axios";

// this is the styles object combined with the Material UI base theme
// to be applied on the components defined below
const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        flexDirection: "row",
    },
}));

const User = (props) => {
    // we get back the processed theme object back in 'classes' object
    const classes = useStyles();

    // this is used to call action generators
    const dispatch = useDispatch();

    // state variable to store username
    const [username, setUsername] = useState("");
    // state variable to store user profile data {bio, location, etc...}
    const [userProfileData, setuserProfileData] = useState(null);

    // destructuring isLoadingData and posts array from REDUX STATE data object
    const { isLoadingData, posts } = useSelector((state) => state.data);

    // this function is used to get the "userProfileData"
    const getUserProfileData = () => {
        axios
            .get(`/user/${username}`)
            .then((response) => {
                // here the data contains both {user and posts array} but we only
                // need user array here, because "posts" array we get from the REDUX STATE data.posts object
                setuserProfileData(response.data.user);
            })
            .catch((err) => {
                console.log(err);
                setuserProfileData(null);
            });
    };

    // componentDidMount
    useEffect(() => {
        setUsername(props.match.params.username);
    }, []);

    // when username is set (not null)
    useEffect(() => {
        if (username) {
            getUserProfileData();
            // call the action generator to fetch user posts and save it to REDUX STATE data.posts object
            dispatch(getUserPosts(username));
        }
    }, [username]);

    // user posts markup
    const profilePostsMarkup = !isLoadingData ? (
        posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
        <div>Loading...</div>
    );

    return (
        <Grid container spacing={3}>
            <Grid item sm={4} xs={12}>
                <StaticProfile userProfileData={userProfileData} />
            </Grid>
            <Grid item sm={8} xs={12}>
                {profilePostsMarkup}
            </Grid>
        </Grid>
    );
};

export default User;
