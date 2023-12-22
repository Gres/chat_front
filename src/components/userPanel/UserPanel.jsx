    import React, {useEffect, useState} from 'react';
    import {Avatar, Box, Button, Typography} from '@mui/material';
    import {useAuth} from "../../providers/AuthProvider";
    import Identicon from 'identicon.js';
    import {generateHexHash} from "../../utils";
    import {useChat} from "../../providers/ChatProvider";

    export default function UserPanel() {
        const { currentUser } = useAuth();
        const {isConnected} = useChat();
        const [userAvatar, setUserAvatar] = useState(null);

        useEffect(() => {
            const userName = currentUser ? currentUser['cognito:username'] : 'Guest';
            generateHexHash(userName).then(hash => {
                const avatarData = new Identicon(hash, 420).toString();
                setUserAvatar(`data:image/png;base64,${avatarData}`);
            });
        }, [currentUser]);

        return (
            <Box sx={{display: 'flex', alignItems: 'center', mt: 4}}>
                <Avatar src={userAvatar} />
                <Box sx={{ml: 2}}>
                    <Typography variant="h6">
                        {currentUser ? currentUser['cognito:username'] : 'Guest'}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'grey.600'}}>
                        {currentUser ? currentUser.email : ''}
                    </Typography>
                    <Box sx={{display: 'flex', alignItems: 'center', mt: 1}}>
                        <Box sx={{width: 8, height: 8, borderRadius: '50%', bgcolor: isConnected ? 'success.main' : 'error.main'}}/>
                        <Typography variant="caption" sx={{ml: 1}}>
                            {isConnected ? 'Online' : 'Offline'}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        );
    }
