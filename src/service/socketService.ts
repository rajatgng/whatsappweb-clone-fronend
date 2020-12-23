import socketIOClient from 'socket.io-client';

const SOCKET_URL = 'http://localhost:4001';

// export const socket = socketIOClient(SOCKET_URL);

class ClientSocket {
    private readonly socket: SocketIOClient.Socket;

    constructor() {
        this.socket = socketIOClient(SOCKET_URL);
    }

    public getSocket(): SocketIOClient.Socket {
        return this.socket;
    }
}

export const socket = new ClientSocket().getSocket();

socket.on('WELCOME_FROM_SERVER', () => {
    console.log(' server connected 22');
});
