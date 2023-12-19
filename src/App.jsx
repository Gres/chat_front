import React, {useState} from 'react';
import {Box} from '@mui/material';
import Sidebar from './components/sidebar/Sidebar';
import ChatArea from './components/chatArea/ChatArea';
import {ChatProvider} from "./providers/ChatProvider";
import CreateRoomDialog from "./components/CreateRoomDialog/CreateRoomDialog";
import {SnackbarProvider} from "./providers/SnackbarProvider";
import {UserProvider} from "./providers/UserProvider";

function App() {
    const [isCreateRoomOpen, setCreateRoomOpen] = useState(false);

    return (
        <SnackbarProvider>
            <UserProvider>
                <ChatProvider>
                    <Box sx={{display: 'flex', height: '100vh'}}>
                        <Sidebar onOpenCreateRoom={() => setCreateRoomOpen(true)}/>
                        <ChatArea/>
                    </Box>
                    <CreateRoomDialog
                        open={isCreateRoomOpen}
                        onClose={() => setCreateRoomOpen(false)}
                    />
                </ChatProvider>
            </UserProvider>
        </SnackbarProvider>
    );
}

export default App;
