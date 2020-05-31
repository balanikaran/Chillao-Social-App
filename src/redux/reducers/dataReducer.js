// redux action types
import { LOADING_DATA, SET_POSTS } from "../actionTypes";

// initial data object state in REDUX STORE
const initialDataState = {
    isLoadingData: false,
    posts: [],
    post: {},
};

export default function (state = initialDataState, action) {
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
        default:
            return state;
    }
}
