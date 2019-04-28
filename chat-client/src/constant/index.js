// Server config
export const SERVER_API = 'https://linhh.dev:4080';
export const SERVER_SOCKET = 'wss://linhh.dev:4081/ws/chat';

export const PEER_CONFIG = {
    'iceServers': [
        { 'urls': 'stun:128.199.116.104:3478' },
        { 'urls': 'stun:128.199.116.104:3479' },
    ]
};

//local:
    // http://localhost:8080
    // ws://localhost:8081/ws/chat
//dev: 10.64.100.31
    // http://10.64.100.31:8080
    // ws://10.64.100.31:8081/ws/chat
//production: 
    // https://linhh.dev:4080
    // wss://linhh.dev:4081/ws/chat