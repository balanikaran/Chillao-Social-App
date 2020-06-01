import React from "react";

import { Link } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";

// redux action generators
import { likePost, unlikePost } from "../../redux/actions/dataActions";

// Material UI
import { IconButton } from "@material-ui/core";

// Material UI Icons
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

// This is a standalone component which returns a like button based
// on user authentication status and liked/not liked by user
// If user is authenticated and user owns the post (a delete button is also shown)
// If user is authenticated, like button is bind to a handleLike/handleUnlike button
// If user is not authenticated the like button is bind to Link to "/login" page url
const LikeButton = (props) => {
    // destructuring isAuthenticated and likes array from the REDUX STATE
    const { isAuthenticated, likes } = useSelector((state) => state.user);

    // destructuring postId from the props for which the like button is being created
    const { postId } = props;

    // to call action generators
    const dispatch = useDispatch();

    // this function checks whether the user has already liked the post or not
    const isPostLiked = () => {
        // check if the postId exists in the likes array of user data
        // (likes array is extracted from state.user)
        if (likes && likes.find((like) => like.postId === postId)) {
            return true;
        } else {
            return false;
        }
    };

    // this function is called when user unlikes the post
    // this called the unlikePost() from the dataReducer.js
    const handleLike = () => {
        dispatch(likePost(postId));
    };

    // this function is called when user likes the post
    // this called the likePost() from the dataReducer.js
    const handleUnlike = () => {
        dispatch(unlikePost(postId));
    };

    // creating the button component
    const likeButtonMarkup = !isAuthenticated ? (
        <Link to="/login">
            <IconButton>
                <FavoriteBorder />
            </IconButton>
        </Link>
    ) : isPostLiked() ? (
        <IconButton onClick={handleUnlike}>
            <Favorite color="secondary"/>
        </IconButton>
    ) : (
        <IconButton onClick={handleLike}>
            <FavoriteBorder />
        </IconButton>
    );

    // rendering...
    return likeButtonMarkup;
};

export default LikeButton;
