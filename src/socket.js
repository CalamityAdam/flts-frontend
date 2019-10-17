import io from 'socket.io-client';

const BACKEND_APP_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'https://flts-backend.herokuapp.com';

const socket = io(BACKEND_APP_URL);

socket.on('connect', () => {
  console.log('Connected!');
});

export default socket;
