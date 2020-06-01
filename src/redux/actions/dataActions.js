// Redux action types
import {
    LOADING_DATA,
    SET_POSTS,
    SET_POST,
    LIKE_POST,
    UNLIKE_POST,
    LOADING_UI,
    ADD_POST,
    SET_ERRORS,
    STOP_LOADING_UI,
    CLEAR_ERRORS,
    POST_COMMENT,
    DELETE_POST
} from "../actionTypes";

// axios
import axios from "axios";

// this function fetches all the posts from the server
// pagination is not yet implemented
export const getAllPosts = () => (dispatch) => {
    // make the isLoadingData in STATE to TRUE
    dispatch({ type: LOADING_DATA });
    // fetch
    axios
        .get("/posts")
        .then((response) => {
            // if successful
            // put fetched posts in the REDUX STATE
            dispatch({
                type: SET_POSTS,
                payload: response.data,
            });
        })
        .catch((err) => {
            // if not successful
            // put empty posts array in the REDUX STATE
            dispatch({
                type: SET_POSTS,
                payload: [],
            });
        });
};

// this function fetched a single post from the server
// WITH comments
export const getPost = (postId) => (dispatch) => {
    // show loading ui
    dispatch({ type: LOADING_UI });
    // make request
    axios
        .get(`/post/${postId}`)
        .then((response) => {
            // set the "post" object in REDUX STATE data object
            dispatch({
                type: SET_POST,
                payload: response.data,
            });
            // stop loading ui
            dispatch({
                type: STOP_LOADING_UI,
            });
        })
        .catch((err) => {
            console.log(err);
            // stop laoding ui
            dispatch({
                type: STOP_LOADING_UI,
            });
        });
};

// This action generator is called when user likes some post
export const likePost = (postId) => (dispatch) => {
    axios
        .get(`/post/${postId}/like`)
        .then((response) => {
            dispatch({
                // success -> update data and user object in REDUX STORE
                type: LIKE_POST,
                payload: response.data,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

// This action generator is called when user unlikes some post
export const unlikePost = (postId) => (dispatch) => {
    axios
        .get(`/post/${postId}/unlike`)
        .then((response) => {
            dispatch({
                // success -> update data and user object in REDUX STORE
                type: UNLIKE_POST,
                payload: response.data,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

// this function is called when user wants to upload a new post on the wall
export const uploadPost = (post) => (dispatch) => {
    // show loading ui
    dispatch({ type: LOADING_UI });
    axios
        .post("/post", post)
        .then((response) => {
            // add post to the "posts" object of REDUX STATE data.posts object
            dispatch({
                type: ADD_POST,
                payload: response.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};

// this action generator is called when user wants to post
// a comment on any post
export const postComment = (postId, comment) => (dispatch) => {
    axios
        .post(`/post/${postId}/comment`, comment)
        .then((response) => {
            // add comment to the currently viewing "post" object of REDUX STATE data.post object
            dispatch({
                type: POST_COMMENT,
                payload: response.data,
            });
            // clear errors
            dispatch({
                type: CLEAR_ERRORS,
            });
        })
        .catch((err) => {
            console.log(err);
            // show errors on ui
            dispatch({
                type: SET_ERRORS,
            });
        });
};

// this action geenrator is called when user wants to delete a post
export const deletePost = (postId) => (dispatch) => {
    axios
        .delete(`/post/${postId}`)
        .then((response) => {
            // action to remove the deleted post from the REDUX STATE data.posts object
            dispatch({
                type: DELETE_POST,
                payload: postId,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
