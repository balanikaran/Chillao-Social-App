import React, { useEffect } from "react";

// components
import Profile from "../components/profile/Profile";
import Post from "../components/post/Post";

// Material UI
import { Typography, Grid, makeStyles } from "@material-ui/core";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Redux actions
import { getAllPosts } from "../redux/actions/dataActions";

// this is the styles object combined with the Material UI base theme
// to be applied on the components defined below
const useStyles = makeStyles((theme) => ({}));

const Home = (props) => {
    // we get back the processed theme object back in 'classes' object
    const classes = useStyles();

    // to call action generators (REDUX)
    const dispatch = useDispatch();

    // this works like `componentDidMount`
    useEffect(() => {
        // after the component is mounted
        // fetch posts from server
        dispatch(getAllPosts());
    }, []);

    // destructuring isLoading and posts array from REDUX STATE
    const { isLoadingData, posts } = useSelector((state) => state.data);

    // TODO
    // CREATE NEW POST section...

    // creating list of Post compoents for every posts fetched in posts array
    // if data is still loading -> simply show loading text
    const postsMarkup = !isLoadingData ? (
        posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
        <div>Loading...</div>
    );

    return (
        <Grid container spacing={3}>
            <Grid item sm={4} xs={12}>
                <Profile />
            </Grid>
            <Grid item sm={8} xs={12}>
                {postsMarkup}
            </Grid>
        </Grid>
    );
};

export default Home;
