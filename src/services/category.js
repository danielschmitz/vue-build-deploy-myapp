import http from './http'

const category = {
    getAll: () => http.get('/api/categories'),
    save: data => http({
        method: 'id' in data ? 'put' : 'post',
        url: 'id' in data ? `/api/categories/${data.id}` :  '/api/categories/',
        data
    })
};

export default category