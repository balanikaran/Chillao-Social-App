import React, { useState } from "react";

// redux actions
import { deletePost } from "../../redux/actions/dataActions";

// Material UI
import {
    Dialog,
    Button,
    DialogActions,
    DialogContent,
    IconButton,
    DialogTitle,
    Typography,
} from "@material-ui/core";

// Material UI icons
import DeleteOutlineRounded from "@material-ui/icons/DeleteOutlineRounded";
import { useDispatch } from "react-redux";

// This is a standalone component which shows a button
// and a dialog box to confirm user to delete the post
const DeleteButton = (props) => {
    // destrcuturing post object from props
    const { postId } = props;

    // used to call the action generators
    const dispatch = useDispatch();

    // state variable to show/hide dialog box
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    // open dialog box
    const handleDeleteButtonClick = () => {
        setIsDeleteDialogOpen(true);
    };

    // this function is called when user chooses to delete post
    const handleDelete = () => {
        // call action generator
        dispatch(deletePost(postId));
        // close dialog
        setIsDeleteDialogOpen(false);
    };

    // close dialog box
    const handleCancel = () => {
        setIsDeleteDialogOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleDeleteButtonClick}>
                <DeleteOutlineRounded color="secondary" />
            </IconButton>
            <Dialog open={isDeleteDialogOpen} fullWidth maxWidth="sm">
                <DialogTitle>Warning!</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this post?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={handleCancel}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleDelete}
                        color="secondary"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteButton;
