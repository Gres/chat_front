    import React, {useEffect, useState} from 'react';
    import {Avatar, Box, Button, Typography} from '@mui/material';
    import {useAuth} from "../../providers/AuthProvider";
    import Identicon from 'identicon.js';
    import {generateHexHash} from "../../utils";

    export default function UserPanel() {
        const { currentUser } = useAuth();
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
                    <Button size="small" variant="outlined">Online</Button>
                </Box>
            </Box>
        );
    }
