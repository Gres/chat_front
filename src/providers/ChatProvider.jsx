import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import mockServer from './mockServer';
import {useSnackbar} from "./SnackbarProvider";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    const [rooms, setRooms] = useState([]);
    const [currentRoomId, setCurrentRoomId] = useState(null);
    const [currentMessages, setCurrentMessages] = useState([]);
    const [roomUsers, setRoomUsers] = useState({});
    const [error, setError] = useState(null);
    const { openSnackbar } = useSnackbar();
    useEffect(() => {
        loadRooms();
    }, []);
    useEffect(() => {
        if (error) {
            openSnackbar(error);
        }
    }, [error, openSnackbar]);

    const loadRooms = async () => {
        try {
            const loadedRooms = await mockServer.getRooms();
            setRooms(loadedRooms);
        } catch (err) {
            setError(err.message);
        }
    };


    const getRooms = useCallback(async () => {
        try {
            const loadedRooms = await mockServer.getRooms();
            setRooms(loadedRooms);
        } catch (err) {
            setError(err.message);
        }
    }, []);







    const setRoomName = useCallback(async (roomId, newName) => {
        try {
            await mockServer.setRoomName(roomId, newName);
            await getRooms();
        } catch (err) {
            setError(err.message);
        }
    }, [getRooms]);


    const leaveRoom = useCallback(async (roomId, userId) => {
        try {
            await mockServer.leaveRoom(roomId, userId);
            if (currentRoomId === roomId) {
                setCurrentRoomId(null);
                setCurrentMessages([]);
            }
        } catch (err) {
            setError(err.message);
        }
    }, [currentRoomId]);


    const getRoomUsers = useCallback(async (roomId) => {
        try {
            const users = await mockServer.getRoomUsers(roomId);
            setRoomUsers(prev => ({ ...prev, [roomId]: users }));
        } catch (err) {
            setError(err.message);
        }
    }, []);

    const getMessages = useCallback(async (roomId) => {
        try {
            const messages = await mockServer.getMessages(roomId);
            setCurrentMessages(messages);
        } catch (err) {
            setError(err.message);
        }
    }, []);


    const sendMessage = useCallback(async (roomId, userId, text) => {
        try {
            await mockServer.sendMessage(roomId, userId, text);
            await getMessages(roomId);
        } catch (err) {
            setError(err.message);
        }
    }, [getMessages]);
    const joinRoom = useCallback(async (roomId, userId) => {
        try {
            if (currentRoomId && currentRoomId !== roomId) {
                await leaveRoom(currentRoomId, userId);
            }
            await mockServer.joinRoom(roomId, userId);
            setCurrentRoomId(roomId);
            await getMessages(roomId);
        } catch (err) {
            setError(err.message);
        }
    }, [currentRoomId, getMessages, leaveRoom]);

    const createRoom = useCallback(async (roomName, userId) => {
        try {

            const newRoom = await mockServer.createRoom(roomName, userId);


            setRooms(prevRooms => {
                const roomIds = prevRooms.map(r => r.id);
                if (!roomIds.includes(newRoom.id)) {
                    return [...prevRooms, newRoom];
                }
                return prevRooms;
            });


            if (currentRoomId && currentRoomId !== newRoom.id) {
                await leaveRoom(currentRoomId, userId);
            }


            await joinRoom(newRoom.id, userId);

        } catch (err) {
            setError(err.message);
        }
    }, [currentRoomId, joinRoom, leaveRoom]);
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
