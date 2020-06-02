import React, { useState } from "react";

// components
import LikeButton from "./LikeButton";
import Comment from "./Comment";

// dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// redux
import { useSelector, useDispatch } from "react-redux";

// redux actions
import { getPost, postComment } from "../../redux/actions/dataActions";

// Material UI
import {
    makeStyles,
    Dialog,
    Button,
    TextField,
    DialogActions,
    DialogContent,
    Paper,
    Typography,
    IconButton,
} from "@material-ui/core";

// Material UI Icons
import ChatBubbleOutlineRounded from "@material-ui/icons/ChatBubbleOutlineRounded";
import LaunchIcon from "@material-ui/icons/Launch";

// this is the styles object combined with the Material UI base theme
// to be applied on the components defined below
const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 10,
    },
    postHeader: {
        display: "flex",
        flexDirection: "row",
        paddingTop: 20,
        paddingLeft: 20,
    },
    postHeaderContent: {
        display: "flex",
        flexDirection: "column",
        marginLeft: 20,
        justifyContent: "center",
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: "50%",
        objectFit: "cover",
    },
    divider: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    body: {
        margin: 20,
    },
    operationsDiv: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        margin: "0px 20px 0px 10px",
    },
    operationsText: {
        textAlign: "center",
        margin: "auto 0",
    },
    button: {
        margin: "auto 20px 10px auto",
    },
    textAndEditDiv: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        marginBottom: 10,
        paddingBottom: 10,
    },
    textField: {
        margin: "10px 20px 10px 20px",
    },
    postButton: {
        marginLeft: "auto",
        marginRight: 30,
    },
}));

// This is a standalone component which renders a button based on prop
// along with a dialog box to show post + new comment edit box + other comments
const ViewPostWithCommentButton = (props) => {
    // we get back the processed theme object back in 'classes' object
    const classes = useStyles();

    // this is to fromNow() from dayjs
    dayjs.extend(relativeTime);

    // destructuring postId -> to get the post data
    const { postId } = props;
    // destructuring fromNotifications (boolean) to check if the rendering
    // request is coming from a home page / notifications button on navbar
    const { fromNotifications } = props;

    // destructuring isAuthenticated from REDUX STATE user object
    const { isAuthenticated } = useSelector((state) => state.user);
    // destructuring isLoading and errors object from REDUX STATE ui object
    const { isLoadingUI, errors } = useSelector((state) => state.ui);
    // destructuring posts array and post object from REDUX STATE data object
    const { posts, post } = useSelector((state) => state.data);

    // get the post from the posts object
    // NOTE -> this is without comments
    const postWithoutComments = posts.filter(
        (post) => post.postId === postId
    )[0]; // <- because filter returns an array

    // this is used to call the action generators
    const dispatch = useDispatch();

    // state variable to hide/show dialog box
    const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);

    // state variable to hold comment by the user to be posted
    const [commentBody, setCommentBody] = useState("");

    // state variable to enable/disable post comment button
    const [isCommentButtonDisabled, setIsCommentButtonDisabled] = useState(
        true
    );

    // this is called when user opens the dialog
    // to view post + comments
    const handleCommentDialogOpen = (event) => {
        setIsCommentDialogOpen(true);
        // get post with comments to show
        dispatch(getPost(postId));
    };

    // this is called when user closes the dialog box [cancel button]
    const handleCloseDialog = () => {
        setIsCommentDialogOpen(false);
    };

    // this is called when user clicks on post comment button
    const handlePostComment = (event) => {
        event.preventDefault();
        // create a new comment object
        const comment = {
            body: commentBody,
        };
        // call the action generators
        dispatch(postComment(postWithoutComments.postId, comment));
        // reset comment text
        setCommentBody("");
    };

    // markup for post
    const postMarkup = isCommentDialogOpen ? (
        <Paper variant="outlined" className={classes.paper}>
            <div className={classes.postHeader}>
                <img
                    src={postWithoutComments.userImage}
                    alt="user=profile"
                    className={classes.image}
                />
                <div className={classes.postHeaderContent}>
                    <Typography variant="button">
                        {postWithoutComments.username}
                    </Typography>
                    <Typography variant="caption">
                        {dayjs(postWithoutComments.createdAt).fromNow()}
                    </Typography>
                </div>
            </div>
            <Typography variant="body1" className={classes.body}>
                {postWithoutComments.body}
            </Typography>
            <div className={classes.operationsDiv}>
                <LikeButton postId={postWithoutComments.postId} />
                <Typography className={classes.operationsText}>
                    {postWithoutComments.likeCount}
                </Typography>
            </div>
        </Paper>
    ) : null;

    // markup for edit text to post comment (if user is authenticated)
    const addCommentMarkup =
        isAuthenticated && isCommentDialogOpen ? (
            <Paper variant="outlined" className={classes.textAndEditDiv}>
                <TextField
                    name="body"
                    type="text"
                    label="Add your comment"
                    multiline
                    rowsMax={3}
                    className={classes.textField}
                    value={commentBody}
                    error={errors && errors.comment ? true : false}
                    helperText={errors && errors.comment}
                    onChange={(event) => {
                        setCommentBody(event.target.value);
                        setIsCommentButtonDisabled(
                            event.target.value.trim().length === 0
                        );
                    }}
                />

                <div className={classes.operationsDiv}>
                    <Button
                        variant="outlined"
                        onClick={handlePostComment}
                        color="primary"
                        className={classes.postButton}
                        disabled={isCommentButtonDisabled}
                    >
                        Post
                    </Button>
                </div>
            </Paper>
        ) : null;

    // markup for comments
    // renders another standalone COMMENT component for every comment
    const postCommentsMarkup =
        !isLoadingUI && isCommentDialogOpen ? (
            post.comments.map((comment) => <Comment comment={comment} />)
        ) : (
            <Typography variant="h6">Loading Comments...</Typography>
        );

    return (
        <>
            <IconButton onClick={handleCommentDialogOpen}>
                {fromNotifications ? (
                    <LaunchIcon />
                ) : (
                    <ChatBubbleOutlineRounded />
                )}
            </IconButton>
            <Dialog open={isCommentDialogOpen} fullWidth maxWidth="sm">
                <DialogContent>
                    {postMarkup}
                    {addCommentMarkup}
                    {postCommentsMarkup}
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={handleCloseDialog}
                        color="primary"
                        className={classes.button}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ViewPostWithCommentButton;
