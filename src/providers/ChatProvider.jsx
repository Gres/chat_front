import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import {useSnackbar} from "./SnackbarProvider";
import WSClient from "./wsClient";

const ChatContext = createContext();
export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({children}) => {
    const [wsClient, setWsClient] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [currentRoomId, setCurrentRoomId] = useState(null);
    const [currentMessages, setCurrentMessages] = useState([]);
    const [roomUsers, setRoomUsers] = useState({});
    const [error, setError] = useState(null);
    const {openSnackbar} = useSnackbar();

    useEffect(() => {
        const client = new WSClient(import.meta.env?.VITE_WS_URL || 'ws://localhost:8089', {
            onOpen: () => {
            },
            onClose: () => {
            },
            onActiveRoomUpdated: ({room}) => {
                if (room && room.id !== currentRoomId) {
                    setCurrentRoomId(room.id);
                    client.getMessages(room.id);
                    client.getRoomUsers(room.id);
                }


            },
            onRoomsUpdated: (updatedRooms) => {
                setRooms(updatedRooms);
            },
            onMessagesUpdated: (updatedMessages) => {
                setCurrentMessages(updatedMessages);
            },
            onMessageSent: (updatedMessages) => {
                setCurrentMessages(updatedMessages);
            },
            onRoomUsersUpdated: (updatedRoomUsers) => {
                setRoomUsers(updatedRoomUsers);
            },
            onRoomJoined: ({roomId}) => {
                client.getRooms();
                client.getRoomUsers(roomId);
            },
            onRoomCreated: ({roomId}) => {
                client.getRooms();
            },
            onRoomLeft: ({roomId}) => {
                client.getRooms();
                client.getRoomUsers(roomId);
            },
            onError: (errorMsg) => {
                setError(errorMsg);
            },

        });
        setWsClient(client);


    }, []);

    useEffect(() => {
        if (error) {
            openSnackbar(error);
        }
    }, [error, openSnackbar]);

    const getRooms = useCallback(() => {
        wsClient && wsClient.getRooms();
    }, [wsClient]);

    const joinRoom = useCallback((roomId, userId) => {
        wsClient && wsClient.joinRoom(roomId, userId);
        setCurrentRoomId(roomId);
    }, [wsClient]);

    const leaveRoom = useCallback((roomId, userId) => {
        wsClient && wsClient.leaveRoom(roomId, userId);
        if (currentRoomId === roomId) {
            setCurrentRoomId(null);
            setCurrentMessages([]);
        }
    }, [wsClient, currentRoomId]);

    const createRoom = useCallback((roomName, userId) => {
        wsClient && wsClient.createRoom(roomName, userId);
    }, [wsClient]);

    const setRoomName = useCallback((roomId, newName) => {
        wsClient && wsClient.setRoomName(roomId, newName);
    }, [wsClient]);

    const getRoomUsers = useCallback((roomId) => {
        wsClient && wsClient.getRoomUsers(roomId);
    }, [wsClient]);

    const sendMessage = useCallback((roomId, userId, text) => {
        wsClient && wsClient.sendMessageToRoom(roomId, userId, text);
    }, [wsClient]);

    const getMessages = useCallback((roomId) => {
        wsClient && wsClient.getMessages(roomId);
    }, [wsClient]);

    return (
        <ChatContext.Provider value={{
            rooms,
            currentRoomId,
            currentMessages,
            roomUsers,
            getRooms,
            joinRoom,
            createRoom,
            setRoomName,
            leaveRoom,
            getRoomUsers,
            sendMessage,
            getMessages,
            error,
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatProvider;
