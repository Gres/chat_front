import React, { useEffect } from 'react';
import { useChat } from "../../providers/ChatProvider";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const RoomDetails = () => {
    const { getRoomUsers, roomUsers, currentRoomId } = useChat();

    useEffect(() => {
        getRoomUsers(currentRoomId);
    }, [currentRoomId, getRoomUsers]);
    const usersInRoom = roomUsers || [];
    return (
        <List>
            {usersInRoom.length > 0
                && usersInRoom.map(user => (
                <ListItem key={user}>
                    <ListItemAvatar>
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user} />
                </ListItem>
            ))}

        </List>
    );
};

export default RoomDetails;
