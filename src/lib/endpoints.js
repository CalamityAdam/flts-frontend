export const BACKEND_APP_URL =
  process.env.NODE_ENV === 'development' ?
    'http://localhost:4000' :
    'https://flts-backend.herokuapp.com';
    
export const FRONTEND_APP_URL =
  process.env.NODE_ENV === 'development' ?
    'http://localhost:3000' :
    'https://adumb.dev';
