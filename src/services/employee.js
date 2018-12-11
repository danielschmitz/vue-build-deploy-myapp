import http from './http';

const employee = {
  getAll: () => http.get('/api/employees'),
  getByRange: (start, end, search) =>
    http.get(`/api/employees?_start=${start}&_end=${end}&q=${search}`),
  save: data =>
    http({
      method: 'id' in data ? 'put' : 'post',
      url: 'id' in data ? `/api/employees/${data.id}` : '/api/employees/',
      data
    }),
  delete: id => http.delete(`/api/employees/${id}`)
};

export default employee;
