import React, { useState } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";

// redux actions
import { uploadPost } from "../../redux/actions/dataActions";

// Material UI
import {
    makeStyles,
    Paper,
    TextField,
    Button,
    Typography,
} from "@material-ui/core";

// this is the styles object combined with the Material UI base theme
// to be applied on the components defined below
const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 10,
        paddingBottom: 10,
    },
    imageAndTextDiv: {
        display: "flex",
        flexDirection: "row",
        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 20,
    },
    textAndEditDiv: {
        display: "flex",
        flexDirection: "column",
        marginLeft: 20,
        justifyContent: "center",
        width: "100%",
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: "50%",
        objectFit: "cover",
    },
    textField: {
        margin: "10px 20px 0px 0px",
    },
    operationsDiv: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        margin: "0px 20px 0px 10px",
    },
    postButton: {
        marginLeft: "auto",
        marginRight: 30,
    },
}));

// This is a standalone component which is used to take userinput {POST}
// and call uploadPost() from userActions.js
const AddPost = (props) => {
    // we get back the processed theme object back in 'classes' object
    const classes = useStyles();

    // used to call action generators
    const dispatch = useDispatch();

    // destructuring isAuthenticated and imageUrl from REDUX STATE user object
    const {
        isAuthenticated,
        credentials: { imageUrl },
    } = useSelector((state) => state.user);

    // destructuring errors from the REDUX STATE ui object
    const { errors } = useSelector((state) => state.ui);

    // state variable to enable / disable the post button
    const [isPostButtonDisabled, setIsPostButtonDisabled] = useState(true);
    
    // state variable to store the post body text
    const [postBody, setPostBody] = useState("");

    // this is called when user wants to post the body text to the server
    const handlePost = (event) => {
        event.preventDefault();
        // create post object
        const post = {
            body: postBody,
        };
        // call uploadPost() action generator from userActions.js
        dispatch(uploadPost(post));
        // reset post body
        setPostBody("");
    };

    // markup
    const addPostMarkup = isAuthenticated ? (
        <Paper variant="outlined" className={classes.paper}>
            <div className={classes.imageAndTextDiv}>
                <img src={imageUrl} className={classes.image} />
                <div className={classes.textAndEditDiv}>
                    <Typography>What's new today?</Typography>
                    <TextField
                        name="body"
                        type="text"
                        label="Add your thought's here"
                        multiline
                        rowsMax={3}
                        className={classes.textField}
                        value={postBody}
                        error={errors && errors.body ? true : false}
                        helperText={errors && errors.body}
                        onChange={(event) => {
                            setPostBody(event.target.value);
                            setIsPostButtonDisabled(
                                event.target.value.trim().length === 0
                            );
                        }}
                    />
                </div>
            </div>
            <div className={classes.operationsDiv}>
                <Button
                    variant="outlined"
                    onClick={handlePost}
                    color="primary"
                    className={classes.postButton}
                    disabled={isPostButtonDisabled}
                >
                    Post
                </Button>
            </div>
        </Paper>
    ) : null;

    return addPostMarkup;
};

export default AddPost;
