// redux action types
import {
    LOADING_DATA,
    SET_POSTS,
    LIKE_POST,
    UNLIKE_POST,
    ADD_POST,
    SET_POST,
    POST_COMMENT,
    DELETE_POST,
} from "../actionTypes";

// initial data object state in REDUX STORE
const initialDataState = {
    isLoadingData: false,
    posts: [],
    post: {},
};

export default function (state = initialDataState, action) {
    let index = null;

    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                isLoadingData: true,
            };
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload,
                isLoadingData: false,
            };
        case SET_POST:
            return {
                ...state,
                post: action.payload,
            };
        case LIKE_POST:
        case UNLIKE_POST:
            index = state.posts.findIndex(
                (post) => post.postId === action.payload.postId
            );
            state.posts[index] = action.payload;
            if (state.post.postId === action.payload.postId) {
                state.post = {
                    ...state.post,
                    ...action.payload,
                };
            }
            return {
                ...state,
            };
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
            };
        case POST_COMMENT:
            index = state.posts.findIndex(
                (post) => post.postId === action.payload.postId
            );
            state.posts[index] = {
                ...state.posts[index],
                commentCount: state.posts[index].commentCount + 1,
            };
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: [action.payload, ...state.post.comments],
                },
            };
        case DELETE_POST:
            index = state.posts.findIndex(
                (post) => post.postId === action.payload
            );
            state.posts.splice(index, 1);
            return {
                ...state,
            };
        default:
            return state;
    }
}
