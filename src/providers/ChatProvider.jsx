import React, {createContext, useCallback, useContext, useEffect, useRef, useState} from 'react';
import { useSnackbar } from "./SnackbarProvider";
import WSClient from "./wsClient";

const ChatContext = createContext();
export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    const [wsClient, setWsClient] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [currentRoomId, setCurrentRoomId] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [currentMessages, setCurrentMessages] = useState([]);
    const [roomUsers, setRoomUsers] = useState({});
    const [error, setError] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const { openSnackbar } = useSnackbar();
    const currentUserIdRef = useRef(null);
    const currentRoomIdRef = useRef(null);
    const initializeWsClient = useCallback(() => {
        const client = new WSClient(import.meta.env?.VITE_WS_URL || 'ws://localhost:8089', {
            onOpen,
            onClose,
            onWhoAmI,
            onActiveRoomUpdated,
            onRoomsUpdated,
            onMessagesUpdated,
            onMessageSent,
            onRoomUsersUpdated,
            onRoomJoined,
            onRoomCreated,
            onRoomLeft,
            onError,
        });
        setWsClient(client);
    }, [setWsClient]);

    const onOpen = useCallback((c) => {
        console.log('%c🔗 WebSocket connection opened', 'color: green');
        setIsConnected(true);
        c?.whoAmI();
        c?.getRooms();
    }, [setIsConnected, wsClient]);

    const onClose = useCallback(() => {
        setIsConnected(false);
    }, [setIsConnected]);

    const onWhoAmI = useCallback( (user) => {
        currentUserIdRef.current = user.id;
        setCurrentUserId(user.id);
        console.log('👤 Who am I?', user);
    }, []);

    const onRoomsUpdated = useCallback((updatedRooms) => {
        setRooms(updatedRooms);
        console.log('🏠 Rooms updated', updatedRooms);
    }, [setRooms]);

    const onMessagesUpdated = useCallback((updatedMessages) => {
        setCurrentMessages(updatedMessages);
        console.log('📨 Messages updated', updatedMessages);
    }, [setCurrentMessages]);

    const onRoomUsersUpdated = useCallback((updatedRoomUsers) => {
        setRoomUsers(updatedRoomUsers);
        console.log('👥 Room users updated', updatedRoomUsers);
    }, [setRoomUsers]);



    const onRoomCreated = useCallback(({ roomId }) => {
        wsClient?.getRooms();
        console.log(`Room ${roomId} created`);
    }, [wsClient]);

    const onRoomJoined = useCallback(({ roomId, userId }) => {
        const currentId = currentUserIdRef.current;
        if (userId && userId === currentId) {
            console.log(`Me 👋 Joined room ${roomId}`);
            currentRoomIdRef.current = roomId; // Update the ref as well
            setCurrentRoomId(roomId);
            wsClient?.getMessages(roomId);
            wsClient?.getRoomUsers(roomId);
        } else {
            console.log(`User ${userId} 👋 Joined room ${roomId}`);
            wsClient?.getRoomUsers(roomId);
        }
    }, [wsClient]);

    const onRoomLeft = useCallback(({ roomId, userId }) => {
        wsClient?.getRooms();
        if (userId === currentUserIdRef.current) {
            console.log(`Me 👋 Left room ${roomId}`);
            setCurrentRoomId(null);
            currentRoomIdRef.current = null; // Update the ref as well
            setCurrentMessages([]);
        } else {
            console.log(`User ${userId} 👋 Left room ${roomId}`);
            wsClient?.getRoomUsers(roomId);
        }
    }, [wsClient]);

    const onMessageSent = useCallback((updatedMessages) => {
        setCurrentMessages(updatedMessages);
        console.log('📨 Message sent', updatedMessages);
    }, [setCurrentMessages]);

    const onRoomNameUpdated = useCallback((updatedRooms) => {
        setRooms(updatedRooms);
        console.log('🏠 Room name updated', updatedRooms);
    }, [setRooms]);

    const onActiveRoomUpdated = useCallback(({ room }) => {
        wsClient?.getMessages(room.id);
        wsClient?.getRoomUsers(room.id);
        console.log('🏠 Active room updated', room);
    }, [ wsClient]);

    const onError = useCallback((error) => {
        if (typeof error === 'string') {
            openSnackbar(error);
        } else {
            if (error.stack && error.message) {
                error = error.message;
            } else if (typeof error === 'object' && error.error) {
                error = error.error;
            } else if (typeof error === 'object' && error.message) {
                error = error.message;
            } else {
                error = '❌ WebSocket error';
            }
        }
        console.error('❌ WebSocket error:', error);
        openSnackbar(error);
        setError(error);
    }, [openSnackbar, setError]);

    useEffect(() => {
        initializeWsClient();
    }, [initializeWsClient]);

    useEffect(() => {
        if (error) {
            openSnackbar(error);
        }
    }, [error, openSnackbar]);

    const getRooms = useCallback(() => {
        wsClient?.getRooms();
    }, [wsClient]);

    const joinRoom = useCallback((roomId, userId) => {
        wsClient?.joinRoom(roomId, userId);
        currentRoomIdRef.current = roomId;
        setCurrentRoomId(roomId);
    }, [wsClient]);

    const leaveRoom = useCallback((roomId, userId) => {
        wsClient?.leaveRoom(roomId, userId);

        if (currentRoomIdRef.current === roomId) {
            setCurrentMessages([]);
        }
    }, [wsClient]);

    const createRoom = useCallback((roomName, userId) => {
        wsClient?.createRoom(roomName, userId);
    }, [wsClient]);

    const setRoomName = useCallback((roomId, newName) => {
        wsClient?.setRoomName(roomId, newName);
    }, [wsClient]);

    const getRoomUsers = useCallback((roomId) => {
        wsClient && wsClient?.getRoomUsers(roomId);
    }, [wsClient]);

    const sendMessage = useCallback((roomId, userId, text) => {
        wsClient && wsClient?.sendMessageToRoom(roomId, userId, text);
    }, [wsClient]);

    const getMessages = useCallback((roomId) => {
        wsClient && wsClient?.getMessages(roomId);
    }, [wsClient]);

    return (
        <ChatContext.Provider value={{
            rooms,
           currentUserId,
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
            isConnected,
            error,
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatProvider;
