import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import {useChat} from "../../providers/ChatProvider";
import {useUser} from "../../providers/UserProvider";

const CreateRoomDialog = ({open, onClose}) => {
    const [roomName, setRoomName] = useState('');
    const {currentUser} = useUser();
    const {createRoom} = useChat();

    const handleCreate = async () => {
        if (roomName) {
            await createRoom(roomName, currentUser?.id);
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create New Room</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="roomName"
                    label="Room Name"
                    type="text"
                    fullWidth
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleCreate}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateRoomDialog;
