import React, {useEffect} from 'react';
import {Button, List, ListItem, ListItemIcon, ListItemText, Typography} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import {useChat} from "../../providers/ChatProvider";
import {useAuth} from "../../providers/AuthProvider";

export default function RoomList() {
    const {rooms, currentRoomId, getRooms, joinRoom} = useChat();
    const { currentUser } = useAuth();
    const userId = currentUser ? currentUser.id : null;
    useEffect(() => {
        getRooms();
    }, [getRooms]);

    const handleJoinRoom = (roomId, userId) => {
        joinRoom(roomId, userId);
    };

    return (
        <List>
            {rooms?.map(room => (
                <ListItem key={room.id} button>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary={room.name}/>
                    {currentRoomId !== room.id && (
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleJoinRoom(room.id, userId)}
                        >
                            Join
                        </Button>
                    )}
                    <Typography
                        variant="caption"
                        sx={{ml: 'auto', bgcolor: 'grey.300', borderRadius: 1, p: 0.5}}
                    >
                        {room.players}/10
                    </Typography>
                </ListItem>
            ))}
        </List>
    );
}
