import React, {useEffect, useState} from 'react';
import { Box, Card, CardContent, CardHeader, TextField, Button } from '@mui/material';
import ChatMessage from "../chatMessage/ChatMessage";
import { useChat } from '../../providers/ChatProvider';
import {useUser} from "../../providers/UserProvider";
export default function ChatArea() {
    const [messageText, setMessageText] = useState('');
    const { sendMessage, getMessages, currentRoomId, rooms } = useChat();
    const { currentUser, setUser } = useUser();
    const userId = currentUser ? currentUser.id : null;
    const currentRoomName = rooms.find(room => room.id === currentRoomId)?.name;
    useEffect(() => {
        if (currentRoomId) {
            getMessages(currentRoomId);
        }
    }, [currentRoomId, getMessages]);
    const handleSendMessage = () => {
        if (messageText.trim()) {
            sendMessage(currentRoomId, userId, messageText).then(() => {
                setMessageText('');
                getMessages(currentRoomId);
            });
        }
    };

    return (
        <Box sx={{ flex: 1, p: 3 }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardHeader title={currentRoomName} />
                <CardContent sx={{ flex: 1, overflowY: 'auto', p: 0 }}>
                    <ChatMessage roomId={currentRoomId} />
                </CardContent>
                <Box sx={{ p: 3, borderTop: 1, borderColor: 'grey.300' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Type your message here..."
                            sx={{ mr: 2 }}
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                        />
                        <Button variant="contained" onClick={handleSendMessage}>
                            Send message
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
}
