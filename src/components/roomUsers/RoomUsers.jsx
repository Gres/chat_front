import React, {useEffect} from 'react';
import {useChat} from "../../providers/ChatProvider";
import {Box, Card, CardContent, CardHeader, List, Typography} from '@mui/material';
import {RoomUser} from "./RoomUser";

const RoomDetails = () => {
    const {getRoomUsers, roomUsers, currentRoomId, isConnected} = useChat();

    useEffect(() => {
        console.info(currentRoomId);
        if (currentRoomId){
            getRoomUsers(currentRoomId);
        }

    }, [currentRoomId, getRoomUsers]);
    const usersInRoom = roomUsers || [];
    if (!isConnected) {
        return (
            <Box sx={{flex: 1, p: 3}}>
                <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                    <CardHeader title="Users online"/>
                    <CardContent sx={{flex: 1, overflowY: 'auto', p: 0}}>
                        <Typography variant="h6" align="center">
                            Connecting...
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        );
    } else if (!currentRoomId) {
        return (
            <Box sx={{flex: 1, p: 3}}>
                <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                    <CardHeader title="Users online"/>
                    <CardContent sx={{flex: 1, overflowY: 'auto', p: 0}}>
                        <Typography variant="h6" align="center">
                            Select a room to start chatting
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        );
    }
    return (
        <Box sx={{flex: 1, p: 3}}>
            <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <CardHeader title="Users online"/>
                <CardContent sx={{flex: 1, overflowY: 'auto', p: 0}}>
                    <List>
                        {usersInRoom.length > 0
                            && usersInRoom.map(user => (
                                <RoomUser key={user.id} user={user}/>
                            ))}

                    </List>
                </CardContent>
            </Card>
        </Box>
    );
};

export default RoomDetails;
