import React, { useEffect } from 'react';
import { useChat } from "../../providers/ChatProvider";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const RoomDetails = () => {
    const { getRoomUsers, roomUsers, currentRoomId } = useChat();

    useEffect(() => {
        getRoomUsers(currentRoomId);
    }, [currentRoomId, getRoomUsers]);

    const usersInRoom = roomUsers[currentRoomId] || [];

    return (
        <List>
            {usersInRoom.map(userId => (
                <ListItem key={userId}>
                    <ListItemAvatar>
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={userId} />
                </ListItem>
            ))}
        </List>
    );
};

export default RoomDetails;
