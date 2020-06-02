import React, { useState } from "react";

// components
import ViewPostWithCommentButton from "../post/ViewPostWithCommentButton";

// redux
import { useSelector, useDispatch } from "react-redux";

// dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// redux actions
import { markNotificationsAsRead } from "../../redux/actions/userActions";

// Material UI
import { Button, Badge, MenuItem, Typography, Menu } from "@material-ui/core";

// Material UI Icons
import Favorite from "@material-ui/icons/Favorite";
import ChatBubbleRounded from "@material-ui/icons/ChatBubbleRounded";

// this is a stand alone component which renders a button with
// a menu attached -> containing notifications
const Notifications = (props) => {
    // to use fromNow() from dayjs
    dayjs.extend(relativeTime);

    // destructuring notifications array from the REDUX STATE
    const { notifications } = useSelector((state) => state.user);

    // this is used to call action generators
    const dispatch = useDispatch();

    // state variable to hold menu anchor element
    // when menu is visible -> anchor element is button
    // when menu is closed/invisible -> anchor element is null/undefined
    const [anchorElement, setAnchorElement] = useState(null);

    // this is called when user opens the notifications button
    // set anchor element to button {event.target}
    const handleOpen = (event) => {
        setAnchorElement(event.target);
    };

    // this is called when user closes the notifications
    // set anchor element to null/undefined
    const handleClose = (event) => {
        setAnchorElement(null);
    };

    // this function is called when the user exits from the menu
    // to mark all the unread notifications as read
    const handleMenuOpened = () => {
        // finding all the notification id which are unread
        let unreadNotificationIds = notifications
            .filter((notification) => notification.read === false)
            .map((notification) => notification.notificationId);
        // calling the action generator
        dispatch(markNotificationsAsRead(unreadNotificationIds));
    };

    // this is markup for button
    let notificationsButtonMarkup;
    if (notifications && notifications.length > 0) {
        // notifications exist
        // now check if notifications are unread
        const numberOfNotifications = notifications.filter(
            (notification) => notification.read === false
        ).length;

        numberOfNotifications > 0
            ? (notificationsButtonMarkup = (
                  <Badge
                      badgeContent={numberOfNotifications}
                      color="secondary"
                      anchorOrigin={{
                          vertical: "top",
                          horizontal: "left",
                      }}
                  >
                      <Button
                          aria-controls={
                              anchorElement ? "simple-menu" : undefined
                          }
                          aria-haspopup="true"
                          variant="outlined"
                          color="inherit"
                          onClick={handleOpen}
                      >
                          Notifications
                      </Button>
                  </Badge>
              ))
            : (notificationsButtonMarkup = (
                  <Button
                      aria-controls={anchorElement ? "simple-menu" : undefined}
                      aria-haspopup="true"
                      variant="outlined"
                      color="inherit"
                      onClick={handleOpen}
                  >
                      Notifications
                  </Button>
              ));
    } else {
        notificationsButtonMarkup = (
            <Button
                aria-controls={anchorElement ? "simple-menu" : undefined}
                aria-haspopup="true"
                variant="outlined"
                color="inherit"
                onClick={handleOpen}
            >
                Notifications
            </Button>
        );
    }

    // this is markup for the menu items which contain individual notifications
    let notificationsMarkup =
        notifications && notifications.length > 0 ? (
            notifications.map((notification) => {
                const verb =
                    notification.type === "like" ? "liked" : "commented on";
                const time = dayjs(notification.createdAt).fromNow();
                const iconColor = notification.read ? "none" : "primary";
                const icon =
                    notification.type === "like" ? (
                        <Favorite
                            color={iconColor}
                            style={{ marginRight: 10 }}
                        />
                    ) : (
                        <ChatBubbleRounded
                            color={iconColor}
                            style={{ marginRight: 10 }}
                        />
                    );

                return (
                    <MenuItem key={notification.createdAt}>
                        {icon}
                        <Typography>
                            {notification.sender} {verb} your post - {time}
                        </Typography>
                        <ViewPostWithCommentButton
                            postId={notification.postId}
                            fromNotifications={true}
                        />
                    </MenuItem>
                );
            })
        ) : (
            <MenuItem>No Notifications</MenuItem>
        );

    return (
        <>
            {notificationsButtonMarkup}
            <Menu
                anchorEl={anchorElement}
                open={Boolean(anchorElement)}
                onClose={handleClose}
                onExited={handleMenuOpened}
            >
                {notificationsMarkup}
            </Menu>
        </>
    );
};

export default Notifications;
