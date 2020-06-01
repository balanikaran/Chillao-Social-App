// redux action types
import {
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    SET_USER,
    STOP_LOADING_USER,
    LIKE_POST,
    UNLIKE_POST,
    MARK_NOTIFICATIONS_AS_READ,
} from "../actionTypes";

// initial user object state in REDUX STORE
const initialUserState = {
    isAuthenticated: false,
    isLoadingUser: false,
    credentials: {},
    likes: [],
    notifications: [],
};

export default function (state = initialUserState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: false,
            };
        case SET_UNAUTHENTICATED:
            return initialUserState;
        case LOADING_USER:
            return {
                ...state,
                isLoadingUser: true,
            };
        case SET_USER:
            return {
                isAuthenticated: true,
                isLoadingUser: false,
                ...action.payload,
            };
        case STOP_LOADING_USER:
            return {
                ...state,
                isLoadingUser: false,
            };
        case LIKE_POST:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        username: state.credentials.username,
                        postId: action.payload.postId,
                    },
                ],
            };
        case UNLIKE_POST:
            return {
                ...state,
                likes: state.likes.filter(
                    (like) => like.postId !== action.payload.postId
                ),
            };
        case MARK_NOTIFICATIONS_AS_READ:
            state.notifications.forEach(
                (notification) => (notification.read = true)
            );
            return {
                ...state,
            };
        default:
            return state;
    }
}
