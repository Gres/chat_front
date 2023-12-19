import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { useChat } from '../../providers/ChatProvider';


export default function ChatMessage({ roomId }) {
    const { currentMessages } = useChat();

    return (
        <Box>
            {currentMessages.map((message, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'start', my: 2 }}>
                    <Avatar src="/placeholder.svg" sx={{ mr: 2 }} />
                    <Box>
                        <Typography variant="caption" sx={{ color: 'grey.600' }}>
                            {message.author}
                        </Typography>
                        <Box sx={{ bgcolor: 'grey.100', borderRadius: 2, p: 2, maxWidth: '75%' }}>
                            {message.text}
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}