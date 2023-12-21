import React, {memo, useEffect, useState} from "react";
import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Identicon from "identicon.js";
import {generateHexHash} from "../../utils";

export const RoomUser = memo(({user}) => {
    const [userAvatar, setUserAvatar] = useState(null);

    useEffect(() => {
        generateHexHash(user.username).then(hash => {
            const avatarData = new Identicon(hash, 420).toString();
            setUserAvatar(`data:image/png;base64,${avatarData}`);
        });
    }, [user.username]);
    return (
    <ListItem>
        <ListItemAvatar>
            <Avatar  src={userAvatar}>
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary={user.username}/>
    </ListItem>);
});

