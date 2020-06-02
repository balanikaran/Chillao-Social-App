import {
    LOADING_UI,
    STOP_LOADING_UI,
    SET_ERRORS,
    CLEAR_ERRORS,
    SET_UNAUTHENTICATED,
} from "../actionTypes";

const initialUiState = {
    isLoadingUI: false,
    errors: null,
};

export default function (state = initialUiState, action) {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                isLoadingUI: false,
                errors: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                isLoadingUI: false,
                errors: null,
            };
        case LOADING_UI:
            return {
                ...state,
                isLoadingUI: true,
            };
        case STOP_LOADING_UI:
            return {
                ...state,
                isLoadingUI: false,
            };
        case SET_UNAUTHENTICATED:
            return initialUiState;
        default:
            return state;
    }
}
