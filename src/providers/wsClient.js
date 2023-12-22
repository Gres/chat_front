class WSClient {
    onOpen = null;
    onClose = null;
    onError = null;
    onResponse = null;

    constructor(url, {
        onWhoAmI,
        onActiveRoomUpdated,
        onRoomsUpdated,
        onMessagesUpdated,
        onRoomUsersUpdated,
        onRoomJoined,
        onRoomLeft,
        onRoomCreated,
        onRoomNameUpdated,
        onMessageSent,
        onOpen,
        onClose,
        onError
    } = {}) {
        this.ws = new WebSocket(url);
        this.isConnected = false;
        this.messageQueue = [];
        this.onOpen = onOpen || (() => {

        }  );
        this.onClose = onClose || (() => {

        } );

        this.onRoomsUpdated = onRoomsUpdated || (() => {
        });
        this.onMessagesUpdated = onMessagesUpdated || (() => {
        });
        this.onRoomUsersUpdated = onRoomUsersUpdated || (() => {
        });
        this.onRoomJoined = onRoomJoined || (() => {
        });
        this.onWhoAmI = onWhoAmI || (() => {

        });
        this.onRoomLeft = onRoomLeft || (() => {
        });
        this.onRoomCreated = onRoomCreated || (() => {
        });
        this.onRoomNameUpdated = onRoomNameUpdated || (() => {
        });
        this.onMessageSent = onMessageSent || (() => {
        });
        this.onActiveRoomUpdated = onActiveRoomUpdated || (() => {
        });
        this.onError = onError || (() => {

        }   );
        this.ws.onopen = () => {
            console.log('%c🔗 WebSocket connection opened', 'color: green');
            this.isConnected = true;
            this.flushMessageQueue();
            this.onOpen && this.onOpen(this);
        };

        this.ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('%c⬇️ Message received', 'color: blue', message);
            this.handleMessage(message);
        };

        this.ws.onclose = () => {
            console.log('%c🔌 WebSocket connection closed', 'color: red');
            this.isConnected = false;
            this.onClose && this.onClose();
        };

        this.ws.onerror = (error) => {
            console.error('❌ WebSocket error:', error);
            this.isConnected = false;
            this.onError && this.onError(error);
        };


        this.actionHandlers = {

            getActiveRoom: this.onActiveRoomUpdated,
            getRooms: this.onRoomsUpdated,
            getMessages: this.onMessagesUpdated,
            getRoomUsers: this.onRoomUsersUpdated,
            joinRoom: this.onRoomJoined,
            leaveRoom: this.onRoomLeft,
            createRoom: this.onRoomCreated,
            setRoomName: this.onRoomNameUpdated,
            sendMessage: this.onMessageSent,
            whoAmI: this.onWhoAmI,
            onError: this.onError
        };
    }

    flushMessageQueue() {
        console.log(`%c🔄 Flushing message queue (${this.messageQueue.length} messages)`, 'color: orange');
        while (this.messageQueue.length > 0) {
            const message = this.messageQueue.shift();
            this.ws.send(message);
        }
    }

    sendMessage(type, data) {
        const token = localStorage.getItem('id_token');
        const message = JSON.stringify({ type, token, ...data });
        if (this.isConnected) {
            console.log(`%c⬆️ Sending message: ${type}`, 'color: blue', data);
            this.ws.send(message);
        } else {
            console.log(`%c🕒 Queuing message: ${type}`, 'color: gray', data);
            this.messageQueue.push(message);
        }
    }

    handleMessage(message) {
        if (message.type === 'response' && message.action && this.actionHandlers[message.action]) {
            const handler = this.actionHandlers[message.action];
            handler && handler.call(this, message.data);
        } else if (message.type === 'error') {
            this.onError && this.onError(message);
        } else {
            console.log('Received unknown message type or action:', message.type, message.action);
        }
    }

    // Методы для отправки запросов на сервер с логированием
    getRooms() {
        console.log('%c🏠 Requesting rooms', 'color: purple');
        this.sendMessage('getRooms', {});
    }

    whoAmI() {
        console.log('%c👤 Requesting user info', 'color: purple');
        this.sendMessage('whoAmI', {});
    }

    getActiveRoom() {
        console.log('%c🏠 Requesting active room', 'color: purple');
        this.sendMessage('getActiveRoom', {});
    }

    joinRoom(roomId, userId) {
        console.log(`%c🚪 Joining room: ${roomId} as user: ${userId}`, 'color: purple');
        this.sendMessage('joinRoom', {roomId, userId});
    }

    leaveRoom(roomId, userId) {
        console.log(`%c🚶‍♂️ Leaving room: ${roomId} as user: ${userId}`, 'color: purple');
        this.sendMessage('leaveRoom', {roomId, userId});
    }

    createRoom(name, userId) {
        console.log(`%c🏗️ Creating room: ${name} by user: ${userId}`, 'color: purple');
        this.sendMessage('createRoom', {name, userId});
    }


    setRoomName(roomId, newName) {
        console.log(`%c✏️ Setting room name: ${roomId} to ${newName}`, 'color: purple');
        this.sendMessage('setRoomName', {roomId, newName});
    }

    getRoomUsers(roomId) {
        console.log(`%c👥 Requesting users for room: ${roomId}`, 'color: purple');
        this.sendMessage('getRoomUsers', {roomId});
    }

    sendMessageToRoom(roomId, userId, text) {
        console.log(`%c💬 Sending message to room: ${roomId} by user: ${userId}`, 'color: purple');
        this.sendMessage('sendMessage', {roomId, userId, text});
    }

    getMessages(roomId) {
        console.log(`%c📩 Requesting messages for room: ${roomId}`, 'color: purple');
        this.sendMessage('getMessages', {roomId});
    }
}

export default WSClient;
