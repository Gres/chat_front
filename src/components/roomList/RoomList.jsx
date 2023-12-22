import React, {memo, useEffect} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import {useChat} from "../../providers/ChatProvider";
import {useAuth} from "../../providers/AuthProvider";
import * as PropTypes from "prop-types";

const Room = memo(({currentRoomId, onClick, room}) => {
   const isCurrentRoom = currentRoomId === room.id;

    return <ListItem button>
        <ListItemIcon>
            {isCurrentRoom && <HomeIcon color="primary"/> }
            {!isCurrentRoom && <ChatIcon/> }
        </ListItemIcon>
        <ListItemText primary={room.name}/>
        {currentRoomId !== room.id && (
            <Button
                size="small"
                variant="outlined"
                onClick={onClick}
            >
                Join
            </Button>
        )}

        <Typography
            variant="caption"
            sx={{ml: "auto", bgcolor: "grey.300", borderRadius: 1, p: 0.5}}
        >
            {room.players}/10
        </Typography>
    </ListItem>;
})

Room.propTypes = {
    room: PropTypes.any,
    currentRoomId: PropTypes.any,
    onClick: PropTypes.func
};
export default function RoomList({onOpenCreateRoom}) {
    const {rooms, currentRoomId, getRooms, joinRoom, isConnected} = useChat();
    const { currentUser } = useAuth();
    const userId = currentUser ? currentUser.id : null;
    useEffect(() => {
        if (isConnected && userId) {
            getRooms();
        }

    }, [getRooms, isConnected, userId]);

    const handleJoinRoom = (roomId, userId) => {
        joinRoom(roomId, userId);
    };

    if (!isConnected) {
        return (
            <Box sx={{flex: 1, p: 3}}>
                <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                    <CardHeader title="Rooms"/>
                    <CardContent sx={{flex: 1, overflowY: 'auto', p: 0}}>
                        <Typography variant="h6" align="center">
                            Connecting...
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        );
    }
    return (
        <Box sx={{flex: 1, p: 3}}>
            <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <CardHeader title="Rooms"/>
                <CardContent sx={{flex: 1, overflowY: 'auto', p: 0}}>
                <List>
                    {rooms?.map(room => (
                        <Room key={room.id} room={room} currentRoomId={currentRoomId}
                              onClick={() => handleJoinRoom(room.id, userId)}/>
                    ))}
                </List>
                    <Box sx={{mt: 3, display: 'flex', justifyContent: 'center'}}>
                        <Button variant="contained" onClick={onOpenCreateRoom}>Create Room</Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>

    );
}
