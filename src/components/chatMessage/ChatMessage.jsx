import React from 'react';
import {Avatar, Box, Typography} from '@mui/material';


export default function ChatMessage({message}) {
    return (
        <Box key={message?.id} sx={{display: 'flex', alignItems: 'start', my: 2}}>
            <Avatar src="/placeholder.svg" sx={{mr: 2}}/>
            <Box>
                <Typography variant="caption" sx={{color: 'grey.600'}}>
                    {message?.author}
                </Typography>
                <Box sx={{bgcolor: 'grey.100', borderRadius: 2, p: 2, maxWidth: '75%'}}>
                    {message?.text}
                </Box>
            </Box>
        </Box>
    );
}
