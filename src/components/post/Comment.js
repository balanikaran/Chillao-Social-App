import React from "react";

// Material UI
import { makeStyles, Paper, Typography } from "@material-ui/core";

// this is the styles object combined with the Material UI base theme
// to be applied on the components defined below
const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 10,
    },
    comment: {
        display: "flex",
        flexDirection: "row",
        paddingTop: 5,
        paddingLeft: 20,
        paddingBottom: 5,
    },
    commentContent: {
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
}));

// This is a standalone component focused on showing an individual comment on a post
const Comment = (props) => {
    // we get back the processed theme object back in 'classes' object
    const classes = useStyles();

    // destrcuturing comment object from props
    const { comment } = props;

    return (
        <Paper variant="outlined" className={classes.paper}>
            <div className={classes.comment}>
                <img src={comment.userImage} alt="user-profile" className={classes.image} />
                <div className={classes.commentContent}>
                    <Typography variant="button">{comment.username}</Typography>
                    <Typography variant="caption">{comment.body}</Typography>
                </div>
            </div>
        </Paper>
    );
};

export default Comment;
