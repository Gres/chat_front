import React from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';
import {useUser} from "../../providers/UserProvider";

export default function UserPanel() {
    const { currentUser } = useUser();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
            <Avatar src="/placeholder.svg" />
            <Box sx={{ ml: 2 }}>
                <Typography variant="h6">
                    {currentUser ? currentUser.name : 'Guest'}
                </Typography>
                <Button size="small" variant="outlined">Online</Button>
            </Box>
        </Box>
    );
}
