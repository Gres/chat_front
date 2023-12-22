import React, {memo, useEffect, useState} from 'react';
import {Avatar, Box, Typography} from '@mui/material';
import {generateHexHash} from "../../utils";
import Identicon from "identicon.js";


export default memo(function ChatMessage({message}) {
    const [userAvatar, setUserAvatar] = useState(null);

    useEffect(() => {
        generateHexHash(message.userName).then(hash => {
            const avatarData = new Identicon(hash, 420).toString();
            setUserAvatar(`data:image/png;base64,${avatarData}`);
        });
    }, [message.userName]);
    return (
        <Box key={message.id} sx={{display: 'flex', alignItems: 'start', my: 2}}>
            <Avatar src={userAvatar} sx={{mr: 2}}/>
            <Box>
                <Typography variant="caption" sx={{color: 'grey.600'}}>
                    {message?.userName}
                </Typography>
                <Box sx={{bgcolor: 'grey.100', borderRadius: 2, p: 2, maxWidth: '75%'}}>
                    {message?.text}
                </Box>
            </Box>
            <Box sx={{ml: 'auto', textAlign: 'right'}}>
                <Typography variant="caption" sx={{color: 'grey.600'}}>
                    {message?.date?.slice(11, 16)}
                </Typography>


            </Box>
        </Box>
    );
})
