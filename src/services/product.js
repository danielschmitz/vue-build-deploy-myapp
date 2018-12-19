import http from './http';

export default {
  getAll: () => http.get('/api/products'),
  getById: id => http.get(`/api/products/${id}`),
  getByRange: (start, end, search) =>
    http.get(
      `/api/products?_expand=category&_expand=supplier&_start=${start}&_end=${end}&q=${search}`
    ),
  save: data =>
    http({
      method: 'id' in data ? 'put' : 'post',
      url: 'id' in data ? `/api/products/${data.id}` : '/api/products/',
      data
    }),
  delete: id => http.delete(`/api/products/${id}`)
};
