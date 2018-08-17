import http from './http';

const login = {
    tryLogin: (email, password) => http.post(
        '/auth/login', { email, password },
    )
};

export default login;