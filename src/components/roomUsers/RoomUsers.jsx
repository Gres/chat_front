import React, {useEffect} from 'react';
import {useChat} from "../../providers/ChatProvider";
import {Avatar, List, ListItem, ListItemAvatar, ListItemText} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const RoomDetails = () => {
    const {getRoomUsers, roomUsers, currentRoomId} = useChat();

    useEffect(() => {
        getRoomUsers(currentRoomId);
    }, [currentRoomId, getRoomUsers]);
    const usersInRoom = roomUsers || [];
    return (
        <List>
            {usersInRoom.length > 0
                && usersInRoom.map(user => (
                    <ListItem key={user.id}>
                        <ListItemAvatar>
                            <Avatar>
                                <PersonIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={user.username}/>
                    </ListItem>
                ))}

        </List>
    );
};

export default RoomDetails;
