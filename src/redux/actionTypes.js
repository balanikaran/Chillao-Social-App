// This file contains all the ACTION TYPES used in this application

// --------------- UI REDUCER ACTIONS ---------------

// This action is called when some error is occured and
// and we have to send those errors to UI to show it to user
export const SET_ERRORS = "SET_ERRORS";

// This action is called when Previous Errors are removed/ no errors
// are found in response (this sets 'errors' object to NULL)
export const CLEAR_ERRORS = "CLEAR_ERRORS";

// This action is called when user interacts with UI/changes page
// this is basically used to TOGGLE isLoadingUI to TRUE
export const LOADING_UI = "LOADING_UI";

// This action is called when user interacts with UI/changes page
// this is basically used to TOGGLE isLoadingUI to FALSE (means loaded/not loading now)
export const STOP_LOADING_UI = "STOP_LOADING_UI";

// --------------- USER REDUCER ACTIONS ---------------

// This action is called when we successfully get the user access token
// from the backend, user is now authenticated (LOGIN/SIGNUP)
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";

// This action is called when we user's session get's expired (JWT Invalid)
// or when USER wants to LOGOUT
export const SET_UNAUTHENTICATED = "SET_UNAUTHENTICATED";

// This action is called when user data is being fetched from the backend
// when the user logs in/ signs up/ opens the application/ refreshes etc [isLoadingUser = True]
export const LOADING_USER = "LOADING_USER";

// This action is called when user data is fetched from the server
// and is to be set in the state, also does the counter of LOADING_USER [isLoadingUser = False]
export const SET_USER = "SET_USER";

// --------------- DATA REDUCER ACTIONS ---------------
