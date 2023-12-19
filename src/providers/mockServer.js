const rooms = [
    {id: 1, name: 'General', players: 5},
    {id: 2, name: 'Game Room 1', players: 3},
    {id: 3, name: 'Test', players: 3},
    {id: 4, name: 'Null room', players: 0},
];

const messages = {
    1: [{author: 'User1', text: 'Hello'}],
    2: [{author: 'User1', text: 'Hello'}]
};

const roomUsers = {
    2: ['userId1', 'userId2'],
    1: ['userId1']
};

const mockServer = {
    getRooms: function () {
        console.log('Getting list of rooms');
        return Promise.resolve(rooms);
    },

    joinRoom: function (roomId, userId) {
        console.log(`User ${userId} attempting to join room ${roomId}`);
        const room = rooms.find(r => r.id === roomId);
        if (room && room.players < 10) {
            if (!roomUsers[roomId]) {
                roomUsers[roomId] = [];
            }
            if (!roomUsers[roomId].includes(userId)) {
                roomUsers[roomId].push(userId);
                room.players += 1;
            }
            console.log(`User ${userId} joined room ${roomId}`);
            return Promise.resolve({success: true, message: 'Joined room'});
        }
        console.log(`Join room failed: Room ${roomId} is full or does not exist`);
        return Promise.reject({success: false, message: 'Room is full or does not exist'});
    },

    createRoom: function (roomName, userId) {
        console.log(`Creating room: ${roomName}`);
        const newRoom = {id: rooms.length + 1, name: roomName, players: 1};
        rooms.push(newRoom);
        roomUsers[newRoom.id] = [userId];
        console.log(`Room ${roomName} created with ID: ${newRoom.id}`);
        return Promise.resolve(newRoom);
    },

    setRoomName: function (roomId, newName) {
        console.log(`Setting new name for room ${roomId}: ${newName}`);
        const room = rooms.find(r => r.id === roomId);
        if (room) {
            room.name = newName;
            console.log(`Room ${roomId} name updated to ${newName}`);
            return Promise.resolve({success: true, message: 'Room name updated'});
        }
        console.log(`Set room name failed: Room ${roomId} not found`);
        return Promise.reject({success: false, message: 'Room not found'});
    },

    leaveRoom: function (roomId, userId) {
        console.log(`User ${userId} attempting to leave room ${roomId}`);
        const room = rooms.find(r => r.id === roomId);
        if (room && roomUsers[roomId]) {
            const userIndex = roomUsers[roomId].indexOf(userId);
            if (userIndex !== -1) {
                roomUsers[roomId].splice(userIndex, 1);
                room.players -= 1;
                if (room.players === 0) {
                    const roomIndex = rooms.indexOf(room);
                    rooms.splice(roomIndex, 1);
                    delete roomUsers[roomId];
                }
                console.log(`User ${userId} left room ${roomId}`);
                return Promise.resolve({success: true, message: 'Left room'});
            }
        }
        console.log(`Leave room failed: Room ${roomId} or user ${userId} not found`);
        return Promise.reject({success: false, message: 'Room or user not found'});
    },

    getRoomUsers: function (roomId) {
        console.log(`Getting users for room ${roomId}`);
        return Promise.resolve(roomUsers[roomId] || []);
    },

    sendMessage: function (roomId, userId, text) {
        console.log(`User ${userId} sending message to room ${roomId}: ${text}`);
        if (!messages[roomId]) {
            messages[roomId] = [];
        }
        const message = {author: userId, text};
        messages[roomId].push(message);
        console.log(`Message sent to room ${roomId}`);
        return Promise.resolve({success: true, message: 'Message sent'});
    },

    getMessages: function (roomId) {
        console.log(`Getting messages for room ${roomId}`);
        return Promise.resolve(messages[roomId] || []);
    }
};

export default mockServer;
