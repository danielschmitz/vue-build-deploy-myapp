import http from './http'

const supplier = {
    getAll: () => http.get('/api/suppliers'),
    getByRange: (start,end, search) => http.get(`/api/suppliers?_start=${start}&_end=${end}&q=${search}`),
    save: data => http({
        method: 'id' in data ? 'put' : 'post',
        url: 'id' in data ? `/api/suppliers/${data.id}` :  '/api/suppliers/',
        data
    }),
    delete: id => http.delete(`/api/suppliers/${id}`)
};

export default supplier