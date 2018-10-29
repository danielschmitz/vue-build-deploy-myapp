import http from './http'

const customer = {
    getAll: () => http.get('/api/customers'),
    getByRange: (start,end) => http.get(`/api/customers?_start=${start}&_end=${end}`),
    save: data => http({
        method: 'id' in data ? 'put' : 'post',
        url: 'id' in data ? `/api/customers/${data.id}` :  '/api/customers/',
        data
    }),
    delete: id => http.delete(`/api/customers/${id}`)
};

export default customer