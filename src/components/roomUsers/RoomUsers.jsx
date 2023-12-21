import React, {useEffect} from 'react';
import {useChat} from "../../providers/ChatProvider";
import {List} from '@mui/material';
import {RoomUser} from "./RoomUser";

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
                    <RoomUser key={user.id} user={user}/>
                ))}

        </List>
    );
};

export default RoomDetails;
