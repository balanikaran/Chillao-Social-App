import React from "react";

// dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// components
import LikeButton from "./LikeButton";
import ViewPostWithCommentButton from "./ViewPostWithCommentButton";
import DeleteButton from "./DeleteButton";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Material UI
import { Paper, makeStyles, Typography, IconButton } from "@material-ui/core";

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
    deleteIcon: {
        marginLeft: "auto",
        marginRight: 20,
    },
}));

// This is a standalone component containing only one post passed as props
const Post = (props) => {
    // we get back the processed theme object back in 'classes' object
    const classes = useStyles();

    // to use fromNow() from dayjs
    dayjs.extend(relativeTime);

    // destructuring isAuthenticated and username (from credentials)
    // from the REDUX STATE
    const {
        isAuthenticated,
        credentials: { username },
    } = useSelector((state) => state.user);

    // destructuring post from the props
    const { post } = props;

    // creating a delete icon component for the post
    // if the current user is the author of the post
    // else NULL
    const deleteIconMarkup =
        isAuthenticated && post.username === username ? (
            <div className={classes.deleteIcon}>
                <DeleteButton postId={post.postId} />
            </div>
        ) : null;

    // TODO
    // comments dialog
    // delete dialog

    return (
        <Paper variant="outlined" className={classes.paper}>
            <div className={classes.postHeader}>
                <img src={post.userImage} className={classes.image} />
                <div className={classes.postHeaderContent}>
                    <Typography variant="button">{post.username}</Typography>
                    <Typography variant="caption">
                        {dayjs(post.createdAt).fromNow()}
                    </Typography>
                </div>
            </div>
            <Typography variant="body1" className={classes.body}>
                {post.body}
            </Typography>
            <div className={classes.operationsDiv}>
                <LikeButton postId={post.postId} />
                <Typography className={classes.operationsText}>
                    {post.likeCount}
                </Typography>
                <ViewPostWithCommentButton postId={post.postId} fromNotifications={false}/>
                <Typography className={classes.operationsText}>
                    {post.commentCount}
                </Typography>
                {deleteIconMarkup}
            </div>
        </Paper>
    );
};

export default Post;
