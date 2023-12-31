import React from 'react';
import {Box, Button, Divider, Typography} from '@mui/material';
import UserPanel from "../userPanel/UserPanel";
import RoomList from "../roomList/RoomList";
import RoomDetails from "../roomUsers/RoomUsers";


export default function Sidebar({onOpenCreateRoom}) {
    return (
        <Box sx={{width: 320, borderRight: 1, borderColor: 'grey.300', overflowY: 'auto'}}>
            <Box sx={{p: 3}}>
                <Typography variant="h4" gutterBottom>Game Chat</Typography>
                <UserPanel/>

            </Box>
            <RoomDetails/>
            <RoomList onOpenCreateRoom={onOpenCreateRoom}/>
        </Box>
    );
}
