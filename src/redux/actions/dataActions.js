// Redux action types
import { LOADING_DATA, SET_POSTS } from "../actionTypes";

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
