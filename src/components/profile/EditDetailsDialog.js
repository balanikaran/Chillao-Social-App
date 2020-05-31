import React, { useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Redux action generators
import { editUserDetails } from "../../redux/actions/userActions";

// Material UI
import {
    Dialog,
    Button,
    TextField,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles,
} from "@material-ui/core";

// this is the styles object combined with the Material UI base theme
// to be applied on the components defined below
const useStyles = makeStyles((theme) => ({
    button: {
        float: "right",
    },
    textField: {
        margin: "10px auto 10px auto",
    },
}));

const EditDetailsDialog = (props) => {
    // we get back the processed theme object back in 'classes' object
    const classes = useStyles();

    // destructuring credentials array from the REDUX STATE
    const { credentials } = useSelector((state) => state.user);

    // creating {bio, website, location} state variables
    // later to be used to create userDetails object for 
    // sending to backend
    const [bio, setBio] = useState(credentials.bio);
    const [website, setWebsite] = useState(credentials.website);
    const [location, setLocation] = useState(credentials.location);

    // state variable for managing visibility of the edit details dialog
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // dispatch is used to call action generators
    const dispatch = useDispatch();

    // this function is called when user clicks on edit details button
    // sets the isDialogOpen variable to TRUE
    const handleOpenDialog = () => {
        console.log("edit called");
        setIsDialogOpen(true);
    };

    // this function is called when user clicks on edit details CANCEL button
    // sets the isDialogOpen variable to FALSE
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    // this function is called when user clicks on edit details SAVE button
    // we call the `editUserDetails()` action generator from `userActions.js`
    const handleSave = () => {
        // creating userDetails Object
        const userDetails = {
            bio,
            website,
            location,
        };
        // call the action generator
        dispatch(editUserDetails(userDetails));
        // close the dialog
        handleCloseDialog();
    };

    return (
        <>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleOpenDialog}
            >
                Edit Profile
            </Button>
            <Dialog open={isDialogOpen} fullWidth maxWidth="sm">
                <DialogTitle>Edit Profile Details</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            variant="outlined"
                            name="bio"
                            type="text"
                            label="Bio"
                            multiline
                            rows="3"
                            placeholder="A short bio about yourself"
                            className={classes.textField}
                            value={bio}
                            onChange={(event) => {
                                setBio(event.target.value);
                            }}
                            fullWidth
                        />
                        <TextField
                            variant="outlined"
                            name="website"
                            type="text"
                            label="Website"
                            placeholder="Your personal/professinal website"
                            className={classes.textField}
                            value={website}
                            onChange={(event) => {
                                setWebsite(event.target.value);
                            }}
                            fullWidth
                        />
                        <TextField
                            variant="outlined"
                            name="location"
                            type="text"
                            label="Location"
                            placeholder="Where you live?"
                            className={classes.textField}
                            value={location}
                            onChange={(event) => {
                                setLocation(event.target.value);
                            }}
                            fullWidth
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={handleCloseDialog}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleSave}
                        color="primary"
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditDetailsDialog;
