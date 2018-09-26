import http from './http'

const category = {
    getAll: () => http.get('/api/categories')
};

export default category